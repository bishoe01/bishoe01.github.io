---
title: "UserDefaults 최근검색어 저장"
date: 2025-02-10
categories: [개발]
tags: [UserDefaults, swift, 문자열]
description: "UserDefaults 활용한 검색기록 저장"
---

itunes의 영화검색 API활용해서 검색어플리케이션을 데모로 만들고 있는데, 검색창이 비었을 때에 대해서 최근검색결과를 UserDefaults 활용해서 저장해주는 과정에서 에러가 발생했다. 작동은하고 있는데, 터미널에 빨간색으로 에러가 발생했다. 

<image 
style="width:300px; height:auto"       src="https://velog.velcdn.com/images/bishoe01/post/18142cb0-9499-489e-9b85-d4aa9b063284/image.png" alt="SearchList" />

>ERROR 발생 ! 
```terminal
ForEach<Array<String>, String, Text>: the ID 그느 occurs multiple times within the collection, this will give undefined results!
ForEach<Array<String>, String, Text>: the ID 가나 occurs multiple times within the collection, this will give undefined results!
```


작동은 되고 있는데, 이게 에러가 좀 있는 듯 하다. id값을 자체로 지정해준게, 여러번 검색 버튼을 눌러버린 탓에 ID값이 중복되어버려서 발생한 문제로 보인다.
  
  
```swift
  if isShowSearchLists {
                    List(RecentSearchLists, id: \.self) {
  item in Text(item)}}
```



### 해결
중복값이 저장 되지 않게끔 로직을 수정해주었다.

```swift
   private var RecentSearchLists: [String] {
        UserDefaults.standard.value(forKey: "recentSearchList") as? [String] ?? []
    }
```
이랬던 코드에서 
```swift
   private var RecentSearchLists: [String] {
        let list = UserDefaults.standard.value(forKey: "recentSearchList") as? [String] ?? []
        return Array(Set(list))
    }
```
이렇게 변경해주었다. Set을 활용해서 간단하게 중복에 대한 처리가 되게끔 했다. 

>#### 또 다른 문제

<image 
style="width:300px; height:auto"       src="https://velog.velcdn.com/images/bishoe01/post/bd0abf68-0da2-47dc-94ad-c14202b1c754/image.png" alt="SearchList" />

이게 SET으로 되니까, 순서에 대한 처리가 안돼서 이를 호출할 때마다 순서가 변경된다. 최근 검색이기 때문에 검색한 순서대로 보여져야 한다! 

> 해결방법

이제는 아까처럼 SET으로하면 순서를 보장할 수 없으니까 변경해야한다. 
그래서 검색을 하면, 중복을 싹 제거해주고 맨 앞에 추가해주는 방식으로 개편했다.
```swift
 private var RecentSearchLists: [String] {
        UserDefaults.standard.value(forKey: "recentSearchList") as? [String] ?? []
    }

    func registSearchLists(term: String) {
        var currentSearchLists = RecentSearchLists
        currentSearchLists.removeAll { $0 == term } // 기존 항목 제거
        currentSearchLists.insert(term, at: 0) // 맨 앞에 추가
        UserDefaults.standard.set(currentSearchLists, forKey: "recentSearchList")
    }
```

이렇게 하니까 이제 검색값이 자연스럽게 최상단으로 오게 변경할 수 있었다. 
<div style="display:flex; align-items:center; justify-content:space-around"> 
<image 
       style="width:230px"
       src="https://velog.velcdn.com/images/bishoe01/post/8a01efc1-6e14-4efd-a4ca-75416761d9d0/image.png" alt="검색결과"/>
<image 
       style="width:230px"
       src="https://velog.velcdn.com/images/bishoe01/post/e07466db-9711-43af-a7db-b6844083e0ed/image.png" alt="최근검색리스트"/>
</div>

#### 느낀점
요소 맨 앞에 넣어주는거는 각 욧들이 한칸씩 뒤로 밀리기 때문에 시간복잡도상 별로 환영받지 못할 로직인 것을 인지하고 있고, 원래는 이럴때 그냥 sort로 뒤집어준 형태로 하면 맨뒤에다 집어넣는 상수시간 복잡도로 해결할 수 있을텐데, 최근검색목록을 무한으로 저장할 것이 아니면서, 추후 확장선면에서도 직관적인게 더 좋은것 같아서, 일단은 이렇게 해결하는 것으로 마무리할 수 있었다. 

#### 다른 해결책
1. 딕셔너리로 해서 TimeStamp값으로 비교할 수도 있을 것 같고 -> 이거는 로직이 너무 복잡해지긴한다.

```swift
private var RecentSearchLists: [String] {
    let data = UserDefaults.standard.value(forKey: "recentSearchList") as? [[String: TimeInterval]] ?? []
    return data.sorted { $0["timestamp"] ?? 0 > $1["timestamp"] ?? 0 }.map { $0["term"] as! String }
}

func registSearchLists(term: String) {
    let timestamp = Date().timeIntervalSince1970
    var currentSearchLists = UserDefaults.standard.value(forKey: "recentSearchList") as? [[String: TimeInterval]] ?? []
    currentSearchLists.removeAll { $0["term"] == term }
    currentSearchLists.append(["term": term, "timestamp": timestamp])
    UserDefaults.standard.set(currentSearchLists, forKey: "recentSearchList")
}
```
2. SET으로 먼저 요소제거를 수행해주면서 일단 removeAll에 드는 o(n) 복잡도를 o(1)로 변경해주는 방식이 있을 것이다.
3. sort활용해서 리스트를 뒤집어주면, 맨뒤에 요소를 추가하는게 맨앞으로 오게 될 것이다.



### 전체코드
```swift
import SwiftUI

struct ContentView: View {
    @State private var SearchTerm: String = ""
    @State private var SearchResults: [SearchResultItem] = []
    @State private var isShowSearchLists: Bool = false
    let BASEURL = "https://itunes.apple.com/search"

    private var RecentSearchLists: [String] {
        UserDefaults.standard.value(forKey: "recentSearchList") as? [String] ?? []
    }

    func registSearchLists(term: String) {
        var currentSearchLists = RecentSearchLists
        currentSearchLists.removeAll { $0 == term } // 기존 항목 제거
        currentSearchLists.insert(term, at: 0) // 맨 앞에 추가
        UserDefaults.standard.set(currentSearchLists, forKey: "recentSearchList")
    }

    var body: some View {
        VStack {
            Text("SEARCH APP")
            HStack {
                TextField("SEARCH", text: $SearchTerm)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
                    .padding(.leading)
                    .onChange(of: SearchTerm) { _, newValue in
                        if newValue.isEmpty {
                            SearchResults.removeAll()
                            isShowSearchLists = true
                        }
                    }

                Button("검색") {
                    APIManager()
                        .request(
                            api: .init(
                                baseURL: BASEURL,
                                method: .GET,
                                parameter: [
                                    "term": SearchTerm,
                                    "country": "KR",
                                    "media": "movie"
                                ]
                            )) { result in
                                switch result {
                                case .success(let data):
                                    isShowSearchLists = false
                                    registSearchLists(term: SearchTerm)
                                    guard let toModel = try? JSONDecoder().decode(
                                        ResponseSearchModel.self,
                                        from: data
                                    ) else {
                                        return
                                    }
                                    SearchResults = toModel.results.map {
                                        item in SearchResultItem(responseModel: item)
                                    }

                                case .failure(let error):
                                    print(error)
                                }
                        }
                }.buttonStyle(.bordered).tint(.blue)

            }.padding()

            VStack {
                if !isShowSearchLists {
                    List(SearchResults) { item in
                        HStack {
                            if let imageUrl = Optional(item.artworkUrl30) {
                                AsyncImage(url: URL(string: imageUrl)) { phase in
                                    switch phase {
                                    case .empty:
                                        ProgressView()
                                    case .success(let image):
                                        image
                                            .resizable()
                                            .frame(width: 30, height: 30)
                                            .cornerRadius(5)
                                    case .failure:
                                        Image(systemName: "photo")
                                            .resizable()
                                            .frame(width: 30, height: 30)
                                    @unknown default:
                                        EmptyView()
                                    }
                                }
                            }
                            VStack(alignment: .leading) {
                                Text(item.trackName)
                                Text(item.artistName)
                                    .font(.subheadline)
                                    .foregroundColor(.gray)
                            }
                        }
                    }.listStyle(PlainListStyle())
                }
                if isShowSearchLists {
                    List(RecentSearchLists, id: \.self) {
                        item in Text(item)
                    }
                }
            }
        }
        .padding()
    }
}

#Preview {
    ContentView()
}
```

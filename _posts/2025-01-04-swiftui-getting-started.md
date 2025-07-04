---
layout: post
title: "Struct vs @ViewBuilder vs Computed Property"
description: "Struct를 만드는 3가지 방법 비교"
date: 2025-07-04 21:00:00 +0900
categories: [SwiftUI]
tags: [SwiftUI, iOS, View]
---

이제 C4가 되면서 본격적인 협업을 시작하기전, 이번에는 막 여기저기서 긁어오는게 아니라, 정말 이미 주어진 자원들을 최대한 활용해보고자했고, 그 중에 하나가 academy 스타일 가이드 문서였다. [appleacademy-styleguide](https://github.com/DeveloperAcademy-POSTECH/swift-style-guide) 
좀 살펴보자면.. 
- 변수/함수 이름은 `lowerCamelCase` 
- 구조체/클래스/열거형은 `UpperCamelCase`같은 어찌보면 좀 익숙한 것들을 설명하고 있었는데, 사실 핵심은 그외 나머지것들인 것 같았다. 이번에는 여기에서 설명하는 View는 `struct`로 구현하는게 권장된다는 이야기에 대해서 좀 그 이유를 따라가보려고 한다..! 

>### 인용
>**핵심 권장사항**: 모든 뷰는 `Struct`로 정의하는 것을 권장합니다. `@ViewBuilder` function이나 computed property로 정의하는 것은 지양합니다.

그러면 일단 이유를 알아보기전에 아직 익숙하지않은 `@ViewBuilder`와 `computed property`에 대해서 좀 알아보고 가보자! 

#### 기호1번 - Struct View
```swift
struct MyButton: View {
    @Binding var isActive: Bool
    var body: some View { ... }
}
```

#### 기호2번 - @ViewBuilder
```swift
@ViewBuilder
func myButton(isActive: Binding<Bool>) -> some View {
    Button("Tap") { isActive.wrappedValue.toggle() }
}
```

#### 기호3번 - Computed Property
```swift
var myButton: some View {
    Button("Tap") { self.isActive.toggle() }
}
```

<img src="https://velog.velcdn.com/images/bishoe01/post/9a2b97b3-270e-4bb8-a2ba-c6541fd1a610/image.png" width=400/>
아직은 잘 모르겠다..! 기호2번이 좀 익숙하지않은데, 좀 더 실제 코드와 함께 알아보도록 해보자 




### 예제 코드

>#### Struct View

```swift
import SwiftUI

/// 좋아요 버튼을 별도의 Struct View로 분리
struct LikeButton: View {
    @Binding var isLiked: Bool
    let size: CGFloat = 24
    
    var body: some View {
        Button(action: { isLiked.toggle() }) {
            Image(systemName: isLiked ? "heart.fill" : "heart")
                .foregroundColor(isLiked ? .red : .gray)
                .font(.system(size: size))
        }
    }
}

/// 메인 View에서 LikeButton을 재사용
struct ContentView: View {
    @State private var liked = false
    
    var body: some View {
        VStack {
            Text("Struct로 만든 LikeButton")
            LikeButton(isLiked: $liked)
        }
    }
}

/// 다른 View에서도 쉽게 재사용 가능
struct ProductCard: View {
    @State private var isFavorite = false
    
    var body: some View {
        HStack {
            Text("상품명")
            Spacer()
            LikeButton(isLiked: $isFavorite)
        }
    }
}
```
-> 여러 View에서 재사용 가능, 의존성 명확

>#### @ViewBuilder

```swift
import SwiftUI

struct ContentView: View {
    @State private var liked = false
    
    var body: some View {
        VStack {
            Text("@ViewBuilder 함수로 만든 LikeButton")
            likeButton(isLiked: $liked)
        }
    }
    
    /// @ViewBuilder 함수로 View를 반환
    @ViewBuilder
    private func likeButton(isLiked: Binding<Bool>) -> some View {
        Button(action: { isLiked.wrappedValue.toggle() }) {
            Image(systemName: isLiked.wrappedValue ? "heart.fill" : "heart")
                .foregroundColor(isLiked.wrappedValue ? .red : .gray)
        }
    }
}

/// 재사용하려면 바로 못쓰고 추가 작업이 필요
struct ProductCard: View {
    @State private var isFavorite = false
    
    var body: some View {
        HStack {
            Text("상품명")
            Spacer()
            // ContentView의 private 함수도 못쓰고
            // 그럼 함수를 public으로 바꾸던지
            // 코드 복붙하던지(이거할꺼면 나눈이유가없음..)
            // extension으로 빼거나
            // 근데그럴거면 그냥 Struct로 새로만드는게 나을듯..!
        }
    }
}
```
-> 재사용하려면 공개 범위 조정, extension 분리 필요

> #### Computed Property

```swift
import SwiftUI

struct ContentView: View {
    @State private var liked = false
    
    var body: some View {
        VStack {
            Text("Computed Property로 만든 LikeButton")
            likeButton
        }
    }
    
    /// 계산 프로퍼티로 View 반환
    var likeButton: some View {
        Button(action: { liked.toggle() }) {
            Image(systemName: liked ? "heart.fill" : "heart")
                .foregroundColor(liked ? .red : .gray)
        }
    }
}
```
-> 파라미터 전달 불가, 일회성 코드에만 적합

### @ViewBuilder와 Computed Property의 한계

### 재사용성 따운 ! ⬇️
- **@ViewBuilder Function**: 다른 View에서 사용하려면 public으로 노출하거나, extension으로 분리해야 함
- **Computed Property**: 파라미터를 받을 수 없어 재사용이 거의 불가능. 복사-붙여넣기만 가능

### 파라미터 전달이 빡셈
```swift
// Computed Property는 파라미터를 받을 수가 없어서 동적 변경이 힘듬 
var customButton: some View {
    Button("고정된 타이틀") { }
}

// Struct View는 당연히 잘 받아서 동적으로 변환가능 
struct CustomButton: View {
    let title: String
    let action: () -> Void
    
    var body: some View {
        Button(title, action: action)
    }
}
```

### Preview도 번거로움
```swift
// Struct View는 Preview 작성이 간단함
struct LikeButton_Previews: PreviewProvider {
    static var previews: some View {
        LikeButton(isLiked: .constant(true))
    }
}
// @ViewBuilder나 Computed Property는 해당 함수나 프로퍼티가 포함된 전체 View를 Preview해야해서 지저분한 프리뷰 코드가 됨 ! 
```


>### 결론
SwiftUI에서 View를 선언할 때는 **Struct**가 권장된다..!

**Struct View의 장점:**
- ✅ 명확한 인터페이스와 의존성
- ✅ 쉬운 재사용과 모듈화
- ✅ 타입 안정성
- ✅ Preview 작성 용이
- ✅ 유연한 파라미터 처리

### 그래서 언제 어떤 방식을 써야할까??!
 • Struct View: 재사용,명확한 의존성 등 **진짜 컴포넌트**가 필요할 때
 • @ViewBuilder/Computed Property: 내부 코드 정리, 재사용 필요 없는 일회성 View, 급한 프로토타입

실제 개발에서는 당장 급할 때 View의 body에 모든 코드를 때려박는 것보다는 `@ViewBuilder`나 `computed property`로 1차적으로 분리하는 것이 나은 선택입니다. 하지만 이는 어디까지나 임시 방편이며, 추후에 시간이 날 때 `Struct`로 깔끔하게 빼주는게 결국 최종 목적지구나 생각을 했다.. 과정이 될수는 있어도 종착지는 `Struct View`구나.. 이전에는 `@ViewBuilder`도 충분히 매력적인 선택지인지 알았는데, 조금 그에대한 환상은 깨진 것 같다.. 

```swift
// 급할 때 - @ViewBuilder로 일단 분리
@ViewBuilder
private func headerSection() -> some View {
    HStack {
        Text("제목")
        Spacer()
        Button("액션") { }
    }
}

// 한숨 때리고 이후에 Struct로 리팩토링
struct HeaderSection: View {
    let title: String
    let action: () -> Void
    
    var body: some View {
        HStack {
            Text(title)
            Spacer()
            Button("액션", action: action)
        }
    }
}
```

<img src="https://velog.velcdn.com/images/bishoe01/post/45d03567-e724-4ef0-a7ea-0a0f5722b620/image.png" width=400 /> 
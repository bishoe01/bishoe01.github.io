---
title: "🎭 @MainActor는 왜 쓰는걸까?"
date: 2025-08-03
categories: [Swift, Development]
tags: [Swift, MainActor, Actor] 
description: "Swift의 @MainActor가 필요한 이유와 UI 업데이트를 안전하게 처리하는 방법"
---

>Project개발을 할때마다 봤던 어노테이션 @MainActor에 대해서 알아보았다.

간단하게 찾아봤을때, UI업데이트를 메인스레드에서 해주라고 Swift에게 알려주는 역할.... 딱 여기까지만 이해했지 사실 정확한 동작원리나, 언제 써주는게 좋은지 빠른 업데이트에 대한 어떤 트레이드오프가 있는지에 대한 정보가 필요했다..!

### @MainActor란?

@MainActor는 해당 메서드나 타입이 항상 메인 스레드에서 실행되어야 함을 나타낸다. SwiftUI나 UIKit 기반 앱에서는 UI 관련 코드가 반드시 메인 스레드에서 실행되어야 하기 때문에, 이를 보장하기 위해 사용된다.

#### Mainthread? 
iOS 앱은 앱이 실행될 때 하나의 메인 스레드에서 시작하면서, UI 업데이트와 사용자 이벤트 처리를 담당하는게 바로 MainThread이다..! xcode에서 제공하는 디버깅창에서 Thread 1에 해당하는 친구가 바로 MainThread라고 이해하시면된다.

나역시 Button에 대한 이벤트처리에 breakPoint를 걸어서 확인해본결과 아래처럼 Thread1에서 이를 담당하고 있음을 알 수 있었다..! 

<img width=350 src="https://velog.velcdn.com/images/bishoe01/post/948b9d2c-cdc8-4f7d-b050-ba7b68f5239f/image.png"/> 

<img width=450 src="https://velog.velcdn.com/images/bishoe01/post/00d8c62e-aeb8-4a0d-92e4-56520934dcd7/image.png"/> 

>UI 업데이트와 사용자 이벤트 처리를 담당하는게 바로 MainThread이다..!


---

지금까지 정리했을때 이게 결국 @MainActor를 쓰게되면 Swift에게 메인 스레드로 동작하라고 강조를 해주는 것이고, 그 메인스레드는 UI를 변경하고자하는 친구니까..! 자연스럽게 ViewModel로 초점을 향했다..! 
** @MainActor를 가장 쓰기 좋은..! ViewModel에 적용하는 예시코드이다.** 

```swift
@MainActor
class MyViewModel: ObservableObject {
    @Published var status = ""

    func updateUI() {
        status = "완료됨"
    }
}
```

ViewModel 전체에 @MainActor를 붙이면, 내부 메서드/프로퍼티를 모두 메인 스레드에서 실행될 수 있다. 

여기서 주의할 점은 UI 업데이트가 많은 ViewModel의 경우 전체에 @MainActor를 붙이는 것이 좋긴하겠지만..! 
내부에서 네트워크 호출, 파일 처리 처럼 시간이 좀 걸리는 작업들이 있다면 메인스레드에서만 실행되게하는건 overhead를 가져올 수 밖에 없을 것이다.! (필요한 곳에만 쓰자!)

그럴때는 꼭 전체가 아니더라도 부분적으로 붙여줄 수가 있다.
```swift
class MyViewModel: ObservableObject {
    @Published var text = ""

    func fetchData() async -> String {
        // 네트워크 호출
    }

    @MainActor
    func updateUI(with value: String) {
        text = value
    }
}
```

시간이 오래 걸리는 작업은 메인 스레드를 벗어나서 처리하고, UI 갱신만 메인에서 하도록 분리하는 방식이다.

#### 간단예시
```swift
actor DataService {
    func fetch() async -> String {
        return "결과"
    }
}

@MainActor
class MyViewModel: ObservableObject {
    @Published var result = ""
    let service = DataService()

    func load() async {
        let data = await service.fetch()
        result = data
    }
}
```

UI 업데이트는 ViewModel에서 메인 스레드로 실행하고, 데이터 처리는 별도의 객체에서 비동기로 처리하는 구조가 이상적일 것이다. 앞에서말한대로 UI업데이트에만 힘을 쓰는게 원래 메인쓰레드의 존재 이유니까 

---

### 정리
- @MainActor는 메인 스레드에서 실행되어야 하는 코드에 명시적으로 사용하는 어노테이션이다.
- ViewModel 전체에 붙이면 편하지만, 무거운 작업까지 메인 스레드에서 실행되므로 주의가 필요하다.
- 메서드 단위로 선택적으로 사용하는 것도 좋은 전략이다.


#### 부록 - 정리하면서 생각난 질문들
(해달을 좋아하니까 질문자로 해달이모지를 사용합니다..!)

**🦦: UI업데이트가 메인 스레드 담당이면, 그럼 다른 로직들은 전부 겉절이 쓰레드에서 실행이 되는가? 메인 스레드가 비워져있어도?**

1. 네트워크, 파일I/O, 데이터 처리, 비동기 작업들은 백그라운드 스레드에서 실행된다. (놀고있다고해서 메인스레드가 UI이외의 것들까지 짬처리 당하지 않음!)
사실 <메인> 이라는 키워드에 꽂힌거지, 메인이라고해서 주인공급의 서은ㅇ이 있고, 그런게 아니라 그냥 메인은 UI담당으로 배정이 되어있는 거라고 이해했다 ! 


**🦦: Task{}로 작업을 배정하면 겉절이 스레드(백그라운드 스레드)로 비동기 실행하게 해주는거 아닌가> 그럼 Task{}안에 UI 업데이트 메소드를 마구 집어넣으면 ?! **


실제로 한번 해보자..! 

```swift
Button("위험한 UI 업데이트") {
                Task {
                    print("Task 스레드: \(Thread.isMainThread)") // true !! ?? !!??1
                    // 백그라운드스레드로 UI 업데이트
                    text = "백그라운드에서 업데이트"
                }
            }
            
            Button("안전한 UI 업데이트") {
                Task {
                    // 백그라운드에서 작업
                    let result = await heavyWork()
                    // UI업데이트 메인
                    await MainActor.run {
                        text = result
                    }
                }
            }
```

#### 의문점
`print("Task 스레드: \(Thread.isMainThread)") // true !! ?? !!??` 이게 왜 true가 찍히지..?! Task{}여도 메인스레드를 건들 수 있는건가? 

[Why is my Task running on the main thread?-reddit](https://www.reddit.com/r/swift/comments/1fszh9m/why_is_my_task_running_on_the_main_thread/)
일단 일반적으로 동작하는건 아닌 듯 한데, 여기 내용을 간단히 정리해보자면..!

#### 그래서 왜 Task가 메인 스레드에서 실행될 수 있을까?
- `Task`는 생성된 위치의 액터 컨텍스트 (MainActor, 다른 actor, 아무것도 없는 경우는 기본 글로벌 큐)
ex) SwiftUI의 View body, UIKit의 메인 스레드 콜백 등 이미 메인 스레드/메인 액터에서 Task를 생성하면, 그 Task의 시작 부분은 메인 스레드에서 실행됩니다.

- `Task`는 명시적으로 @MainActor를 지정하지 않으면 suspension point(비동기 함수 호출) 이후에는 글로벌 뷰 같이 시스템이 적절한 스레드를 판단해서 할당할 수도 있다.

>*suspensionPoint란?*

- 비동기코드에서 코드실행이 잠시 멈췄다가 다시 이어질 수 있는 지점
```swift
Task {
    print(Thread.isMainThread) // true (메인 스레드)
    await someAsyncFunction()  // suspension point
    print(Thread.isMainThread) // true 또는 false (스레드가 바뀔 수 있음)
}
```

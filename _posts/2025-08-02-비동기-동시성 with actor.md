---
title: "🔄 Swift 비동기/동시성과 Actor"
date: 2025-08-02
categories: [Swift, Development]
tags: [Swift, Async, Concurrency, Actor, 비동기, 동시성]
description: "Swift에서 비동기와 동시성의 차이점, 그리고 actor를 통한 안전한 동시성 프로그래밍"
---

>내가 Swift에서 비동기와 동시성을 공부하면서, 가졌던 의문들과 이해 과정을 정리해봤다. 

---

### 의문

- 동시성이랑 비동기는 같은 말인가? 
- 비동기는 작업 순서를 보장하는가? 아니면 별도의 스케줄링 알고리즘이 있나?
- 그러면 최신 데이터를 보장받으려면 어떻게 해야하는가? 
- actor? Task?  

---

### 비동기 vs 동시성
사실 결론부터 말하면, 이 둘은 직접 비교되는 개념이 아니다. 
마치 사과와 빨간색을 비교하는 것과 같다. 
과일과 색깔이라는 다른 범주의 개념이지만, 사과가 빨갛다고 말할 수는 있는 것처럼.

> 비동기(Async): 지금 이 작업이 끝날 때까지 기다리지 않고 다음 작업을 진행할 수 있는 구조
> 동시성(Concurrency): 여러 작업을 동시에 실행할 수 있는 구조

비동기는 **흐름**에 대한 것.
동시성은 **실행 구조**에 대한 것.

> 모든 동시성 작업은 비동기적이지만,
> 모든 비동기 작업이 반드시 동시에 실행되지는 않는다.

**때문에 어떻게 사용하느냐에 따라 순차 실행과 동시 실행으로 구분될 수 있다.** 

#### 순차 실행

```swift
func loadData() async {
    let user = await fetchUser()
    let posts = await fetchPosts(user : user)
}
```

`fetchUser()`가 끝난 후에야 `fetchPosts()`가 시작된다.
→ 비동기 함수들을 사용했지만, 실제로는 순차적으로 실행되는 것이다. 


---

### 동시성으로 실행되는 경우

```swift
func loadData() async {
    async let user = fetchUser()
    async let posts = fetchPosts()
    
    let (u, p) = await (user, posts)
}
```

`user`, `posts`를 **동시에 요청하고, 결과를 한꺼번에 `await`한다.**

---

### 작업 순서는 보장되는가?

사실 이 부분이 공부하면서 제일 궁금했던 주제다. 동시성으로 여러 작업을 동시에 처리할 수 있다면, 그 작업들의 **실행 순서가 보장되지 않을 경우** 어떤 문제가 생길 수 있을까?

예를 들어, A에서는 이름을 수정하고, B에서는 이름을 가져오는 작업이 있다고 했을 때 **B가 먼저 실행되어 수정 전 데이터를 가져온다면?**

> 결론: 작업 순서는 보장되지 않는다.

Swift는 어떤 작업(Task)이 먼저 실행될지 보장해주지 않는다.
특히 `Task`를 여러 개 사용해서 동시에 요청을 날리는 경우,
어떤 Task가 먼저 실행되고, 어떤 Task가 나중에 실행될지는 **스케줄러의 결정에 따라 달라진다.** 

---

### 작업 순서가 중요한 경우엔?

실행 순서를 **직접 명시해줘야 한다.** 가장 기본적인 방법은, `Task` 내부에서 `await`를 순서대로 호출하는 것이다. 

```swift
Task {
    await step1()
    await step2()
}
```

이렇게 하면 `step1()`이 끝난 다음에야 `step2()`가 실행되므로
우리가 원하는 순서로 실행시킬 수가 있다. 

---

### 그런데 동시에 여러 작업이 같은 값을 건드리면?

이건 순서만의 문제가 아니다.
A와 B 두 Task가 동시에 같은 변수에 대해 `+= 1`을 수행한다면
정상적으로는 `+2`가 되어야 하지만, 실제로는 `+1`만 되거나 값이 꼬일 수 있다.

이런 상황을 **데이터 레이스(data race)**라고 한다.
[레이스 컨디션](https://en.wikipedia.org/wiki/Race_condition)과 유사하지만,
**동시에 메모리에 접근하는 작업에서 실행 타이밍에 따라 결과가 달라지는 문제**를 말한다.

---

### actor란?

Swift에서는 이런 문제를 해결하기 위해 `actor`라는 타입을 제공한다.
`actor`는 `class`처럼 생겼지만,
**여러 작업이 동시에 접근하더라도 내부 상태를 자동으로 직렬 처리**해서
데이터 충돌 없이 안정적인 처리가 가능하다.

```swift
actor Counter {
    var value = 0

    func increase() {
        value += 1
    }
}
```

---

### Actor Isolation

Actor isolation은 actor가 어떻게 안정성을 보장하는지에 대한 매커니즘이다.
각 actor는 **고유한 isolation domain**을 가지며, actor 내부의 모든 프로퍼티와 메서드가 **동시에 하나의 Task만** 접근할 수 있게 설계되어있다. 

> Actor isolation은 컴파일 타임에 검증되기 때문에, data race를 원천적으로 차단한다.

#### let vs var의 차이

actor 내부에서 `let`과 `var`는 다르게 동작한다.

- let일때는 외부접근하더라도 await가 필요가 없겠지만, var일때는 self일때만 await가 요구되지않고, 

```swift
actor BankAccount {
    let accountNumber = "123456"  // 불변값 - 동기적 접근 가능
    var balance = 1000            // 가변값 - 비동기적 접근 필요
}

// actor 외부에서 인스턴스에 접근할 때
let account = BankAccount()
print(account.accountNumber)     // await 없이 접근 가능
print(await account.balance)     // await 필요
```

`let`으로 선언된 상수는 **변경될 가능성이 없으므로** 동기적으로 접근 가능하다.
반면 `var`로 선언된 변수는 **언제든 변경될 수 있으므로** actor의 isolation을 통해야 한다.

#### Cross-Actor Reference

다른 actor의 메서드나 프로퍼티에 접근할 때는 **cross-actor reference**가 발생한다

```swift
actor 로그찍어주는액터 {
    func log(_ message: String) {
        print(message)
    }
}

actor DataProcessor {
    func processData() async {
        let 로그액터 = 로그찍어주는액터()
        // 다른 actor에서부터 호출할때는 비동기로 접근을 해야한다..!  -> await 필요!
        await 로그액터.log("Processing started")
    }
}
```

이런 cross-actor 호출은 Swift 컴파일러가 자동으로 감지하고, 
`await`를 요구함으로써 **데이터 레이스를 컴파일 타임에 방지**한다.

---

### actor 활용

```swift
let counter = Counter()

Task {
    await counter.increase()
    let currentValue = await counter.value
    print(currentValue)
}
```

`Counter`는 내부적으로 **고유한 Serial Executor**를 가진다.
여러 Task가 동시에 `increase()`를 호출해도 Swift는 이 요청들을 한 줄로 직렬화시켜서 **한 번에 하나씩만 실행**시키는 것이다.
이렇게하면 순차적 실행이기때문에,  `value` 값이 꼬이는 불상사는 없다.

그리고 actor 내부 속성이나 메서드에 접근할 때 `await`를 붙여야 하는 이유도 이 때문이다. Swift가 해당 작업을 직렬 큐에 등록하고 **순차적으로 실행**할 수 있도록 보장하는 구조인 것!

#### Isolation 동작 원리

Actor isolation은 다음과 같은 과정으로 동작한다:

1. **컴파일 타임 검증**: Swift 컴파일러가 actor 경계를 넘는 모든 접근을 추적
2. **비동기 전환**: actor 외부에서의 접근은 자동으로 비동기 호출로 변환
3. **직렬화 보장**: Actor의 executor가 모든 작업을 순차적으로 처리

```swift
actor Counter {
    private var count = 0
    
    func increment() {
        count += 1  // actor 내부에서는 동기적 접근이 가능하다. await없어도됨 ! 
    }
    
    func getValue() -> Int {
        return count
    }
}

// 사용 예시
let counter = Counter()

// 여러 곳에서 동시에 접근해도 안전
Task {
    await counter.increment()
}
Task {
    await counter.increment()
}
print(await counter.getValue())  // 순차적으로 실행되어 안전하다! 
``` 

---

### class와의 차이점

같은 코드를 `class`로 바꾼다면?

```swift
class Counter {
    var value = 0

    func increase() {
        value += 1
    }
}
```

겉보기에는 동일하지만, 이 경우 여러 Task가 동시에 `increase()`를 호출하면 **데이터 충돌이나 레이스 컨디션이 발생할 수 있다.**

actor를 사용하면 직접 락이나 동기화 코드를 작성하지 않아도 된다 ! 

---

### 그러면 무조건 클래스 상위호환 아닙니까?! actor는 무조건 좋은 걸까?

꼭 그렇진 않다. actor는 내부 상태를 안전하게 보호하는 대신 모든 작업을 **직렬화해서 하나씩 실행**하기 때문에 **성능이 저하될 수 있다.** 특히 actor 내부에서 오래 걸리는 작업이 있을 경우, 다음 작업을 기다려야되니따 전체 처리 흐름이 느려질 수 있다.

---

### 그럼 actor는 언제 써야 하는 것인가? 

> 여러 Task가 동시에 접근할 수 있고,
> 그 값이 꼬이면 안 되는 경우에만!

사례를 들자면
- 다운로드 진행률 상태 관리
- 통계 누적
- 캐시 기록
- 공용 로그 저장 등
**읽기/쓰기 작업이 엇갈릴 수 있는 상황에서 효과적**

---

### 이것역시 작업 순서까지 보장되는 건 아니다.

`actor`는 내부 데이터를 보호해주는 것이지, 작업 순서까지 보장하는 것은 아니다. 혼선이 안생기게 직렬화 해주는 것일 뿐! 

>결국 **순서가 중요한 작업**이라면
Task 내부에서 순차적으로 `await`를 사용하거나
**queue 구조를 따로 설계**해야 한다.

---

### 정리

* 비동기와 동시성은 서로 다른 개념이다.
* 작업 순서가 중요할 경우 `Task` 안에서 직접 설계해야 한다.
* 동시에 같은 값을 수정한다면 `actor`를 사용해 직렬화가 필요하다.
* actor는 안전하지만 느릴 수 있으니 **용도에 맞게 선택**해야 한다.

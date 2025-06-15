---
title: "final 키워드와 Method Dispatch Type"
date: 2025-06-15
categories: [개발]
tags: [final, method dispatch type, swift]
description: "Dispatch Type에 따른 성능차이"
---

# SwiftData와 final 키워드: 성능 최적화의 숨겨진 비밀

SwiftData를 공부하다가 모델 클래스에서 자주 보이는 `final` 키워드가 궁금해졌다. 다른 언어에서도 봤던 것인데ㅡ 정확히 뜻을 잘 모르는 것 같아서 이번 기회에 좀 그쪽에 대해서 조사를 해보았다 ! 
그냥 상속을 막는 키워드 정도로만 알고 있었는데 좀 더 다재다능한 친구였다 ..!

>#### 먼저 SwiftData 란 ? 
>SwiftData는 Apple이 만든 최신 데이터 영속성 프레임워크다. 
>CoreData의 복잡함을 제거하고 SwiftUI와 완벽하게 통합된 간단한 API를 제공한다.

>#### 영속성이 뭔 뜻? (persistence)
>지속되는 성질이라는 뜻인데, 쉽게 말하면 **데이터가 프로그램이 종료되어도 사라지지 않고 계속 남아있는 특성**이다. 결론적으로 전원을 꺼도 데이터가 남아있느냐 없느냐의 차이다.

```swift
// 일반 배열 (비영속적) - 메모리에 저장
var todos = [
    "SSG공부하기",
    "세션 체킹하기",
    "카페가기"
]
// 앱 종료하는 순간 데이터 손실

// SwiftData (영속적) - 디스크에 저장
@Model
class Todo {
    var title: String
    var isCompleted: Bool
}
// 앱 종료해도 데이터가 보존됨
```

## SwiftData 모델 생성하기
일반적으로 모델은 이렇게 생성을 할 것이다. 간단한 `USER`클래스다.
```swift
import SwiftData

@Model
final class User {
    var name: String
    var age: Int
    var createdAt: Date
    
    init(name: String, age: Int) {
        self.name = name
        self.age = age
        self.createdAt = Date()
    }
}
```

- `@Model` 매크로 추가
- `final class`로 선언
- 기본 Swift 타입 사용 가능

여기서 눈에 띄었던게`final` 키워드다. 
여기서는 왜 굳이 `User`를 써야했을까? 

## final 키워드의 역할

### 기본적으로 final 뜻은..
`final`로 선언하면 상속이 불가능하게 해준다. 
기존에 생성된 형태 그대로만을 고수해야하는 것인데, 데이터 모델은 상속할 일이 없기때문에 웬만하면 final로 선언해주는게 또 이상적인 방식이다! (Apple 문서에서도 final 로 선언중)

### 성능에도 좋다는 풍문이...
여기서 진짜 다룰 내용은 바로 이 **final이 성능에 미치는 영향**이다. 이걸 이해하려면 Swift의 Method Dispatch 방식을 알아야 한다.

## Method Dispatch - Swift는 어떻게 override 된 친구를 찾고 실행할까?

Swift는 메서드를 호출할 때 두 가지 방식을 사용한다. 
**Static**과 **Dynamic**, 그리고 여기서 Dynamic 특성덕분에 자유롭게 상속하고, 유동적으로 활용할 수 있는 것 대신에 Runtime Performance를 손해보고 있다..!

### Static Dispatch (정적 디스패치)
- **결정 시점**: 컴파일 타임
- **방식**: 메서드 실제 주소로 직접 점프
- **성능**: 빠름 (메모리 접근 1번)
- **제약**: 오버라이딩 불가

### Dynamic Dispatch (동적 디스패치)
- **결정 시점**: 런타임  
- **방식**: VMT(Virtual Method Table)를 통해 간접 점프
- **성능**: 상대적으로 느림 (메모리 접근 2-3번)
- **장점**: 다형성, 오버라이딩 지원

### 비유하자면...

#### Static = 미리 정한 약속
```
"내일 오후 2시 강남역 스타벅스에서 만나자"
→ 시간, 장소 미리 확정
→ 바로 해당 장소로 이동
```

#### Dynamic = 당일 연락 후 결정
```
"내일 만나자! 장소는 철수한테 물어봐"
→ 철수에게 연락 필요
→ 장소 확인 후 이동
```

> #### 그럼 여기서 철수란? -> VMT

## VMT(Virtual Method Table)의 동작 원리

Swift의 Dynamic Dispatch 를 통해 override와 상속을 할 수 있다. 이를 위해 method 들과 property 들은 vtable에 배열로 저장된다. 런타임에 Method Table에서 해당 method 들과 property를 찾고 간접 호출(indirect call) 방식으로 호출한다.

### VMT 구조와 생성

```swift
class Animal {
    func makeSound() { }  // VMT[0]
    func eat() {   // VMT[1]
	    print("개처럼먹기")
    }       
}
class Dog: Animal {
    override func eat() { }  // VMT[1] 오버라이드
    // makeSound()는 상속받음
}
```

#### 컴파일 타임 VMT 생성
```
Dog VMT
[0] : makeSound() 오버라이드 안 함 -> Animal.makeSound() 주소 복사
[1] : eat() 오버라이드 함 -> Dog.eat() 주소 사용

Dog VMT
[0] → 0x1111 (Animal.makeSound)
[1] → 0x9999 (Dog.eat)
```

### 실행 과정 비교

#### Static Dispatch 실행
```
컴파일 타임: 메서드 주소 확정
런타임: call 0x12345678 (직접 점프)
```

#### Dynamic Dispatch 실행
```
컴파일 타임: VMT 생성 및 주소 매핑 완료
런타임: 
1. 객체 → VMT 주소 찾기
2. VMT[index] → 메서드 주소 조회  
3. 해당 주소로 점프
```

```swift
let animal: Animal = Dog()
animal.eat()

// Dynamic Dispatch
// 1)animal 객체 확인 → Dog발견!
// 2)Dog VMT 접근
// 3)Dog VMT[1] → 0x9999 찾음 ! 
// 4)0x9999로 점프하여 Dog.eat() 실행하면 끝 
```

### VMT 의 구조는? 메소드 주소를 갖고 있는 배열 (따른 언어에서는 포인터 주소를 갖고 있는 배열이 도리 것이다. C같은..)
- 각 클래스 마다 하나의 VMT를 분양할 수 있다..!
- 클래스의 가상 메서드들에 대한 주소를 순서대로 저장한다.
- 인스턴스는 해당 클래스의 테이블에 대한 주소값을 가지고, 런타임에 올바른 메서드를 찾아 호출할 수 있다. (정확히는 TypeMeta 데이터 안에 VMT 주소가 있음!)

final 키워드를 통해 더 이상 상속이 없을거에요!! 라고 정의해주면 컴파일단계에서 Swift가 이제 최적화하여 VMT참조할 필요 없이 Static Dispatch가 가능하다.

#### Dynamic Dispatch는 왜 사용할까?
다형성을 지원하기 위해서 이렇게 함! 대신 프로그램이 훨씬 유연해지고 확장성이 좋음!

### Dynamic Dispatch (메모리 접근 2번 (TypeMeta 데이터까지 포함하면 3번))
```
컴파일 타임: VMT 생성 및 배치
런타임: VMT 활용해서 주소 찾기
```
### Static Dispatch 
```
컴파일 타임: 주소 확정 및 코드에 직접 삽입
런타임: 바로 실행
```

### 그럼 단순 Class만인가?

| 타입            | Dispatch 방식 | 이유                        |
| ------------- | ----------- | ------------------------- |
| `final class` | Static      | 상속 불가                     |
| `class`       | Dynamic     | 상속/오버라이딩 가능               |
| `struct`      | Static      | 상속 불가                     |
| `protocol`    | Dynamic     | Protocol Witness Table 사용 |
| `extension`   | Static      | 오버라이딩 불가                  |

### 그럼 Class내부에서 일부만 final로 선언해주면?
- 그럼 컴파일 단계에서 그 부분만 빠지고 실제 주소가 매핑되는것이고
- final아닌애들만 모아서 VMT가 생성됨

그럼 컴파일때 VMT만들고 주소가 매핑되어있긴한데, 그게 실제 사용하는 메소드랑 연결되어있다기보다 그냥 그렇게해서 컴파일을 하게 되면 그때 매핑이 다 되어있는 VMT에 접근해서 주소로 접근한다는거네

## SwiftData에서 final이 중요한 이유

많은 개발자들이 놓치는 부분이 있다. "데이터는 메서드가 없지않나? 그러면 Final로 굳이 해줄 필요가 없을 것 같은데?"

## 땡!

### @Model은 결국 Observable,Identifiable

```swift
@Model
final class User {
    var name: String
}
```

실제로 컴파일러가 이해하는 것:

```swift
final class User: Observable, Identifiable {
    var name: String {
        get { /* getter 메서드 */ }
        set { /* setter 메서드 + 변경 알림 */ }
    }
    
    var id: UUID = UUID()
    
    // Observable 자동 구현
    private var observers: [Observer] = []
    func addObserver(_ observer: Observer) { /* ... */ }
    func notifyChange() { /* ... */ }
}
```

**핵심:** `@Model`은 결국 Observable, Identifiable 프로토콜을 구현하고, 모든 프로퍼티는 getter/setter 메서드를 가진다.

```swift
@Model final class User {
		var name: String // 이것도 사실 getter/setter 메서드 
	}
let user = User() 
user.name = "홍길동" // setter 메서드 호출 
print(user.name)   // getter 메서드 호출
```

### 성능 차이 시각화

- final이 안붙어있는 경우에는 이게 하위클래스에서 오버라이드 될 수 있어서, 그 부분을 다 체크한뒤에 지금 실행 조건에 맞는 메서드를 실행하는 구조인데,
- final 로 생성된 친구는 그런거 고려할 거 없이 그냥 바로 찾아서 실행할 수가 있다.

```
일반 클래스 메서드 호출:
메서드 호출 → 타입 체크 → 오버라이드 체크 → 실제 메서드 찾기 → 호출
   (느림)        (시간)        (시간)          (시간)        (실행)

final 클래스 메서드 호출:
메서드 호출 → 바로 실행
   (빠름)       (실행)
```

### SwiftData에서 final을 권장하는 이유

```swift
@Model
final class User {
    var name: String  // 얘가 변수라고해서 메서드가 아닌게 아님! 다 getter/setter가 필요한 친구들임!!
}
```

```swift
class Animal { func sound() }
class Dog: Animal { override func sound() }
class Cat: Animal { override func sound() }
```

#### 컴파일 단계에서 VMT 매핑
```
VMT 생성
┌─────────────┐
│ Animal VMT  │ [0] → 0x1111 (Animal.sound)
├─────────────┤
│ Dog VMT     │ [0] → 0x2222 (Dog.sound)  
├─────────────┤
│ Cat VMT     │ [0] → 0x3333 (Cat.sound)
└─────────────┘
실행 파일 완성

```

## 최종 정리

#### 컴파일 타임
- Static: 메서드 주소 확정
- Dynamic: VMT 생성 및 주소 매핑

#### 런타임
- Static: 바로 실행
- Dynamic: VMT 조회 후 실행


### 참고자료
- [Swift Performance 향상 시키기 (feat. Method Dispatch)](https://medium.com/delightroom/swift-performance-%ED%96%A5%EC%83%81-%EC%8B%9C%ED%82%A4%EA%B8%B0-feat-method-dispatch-493ac4fc7782)
- [Writing High-Performance Swift Code](https://github.com/swiftlang/swift/blob/main/docs/OptimizationTips.rst#dynamic-dispatch)
- [Understanding Swift performance - Method Dispatch](https://velog.io/@go90js/methodedispatch)

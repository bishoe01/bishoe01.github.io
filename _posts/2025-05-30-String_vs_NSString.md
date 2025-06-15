---
title: "String vs NSString"
date: 2025-06-04
categories: [개발]
tags: [swift, Algorithm, 문자열]
description: "일고리즘을 풀면서 만난 String vs NSString"
---

> ### 문제 설명
[1678. Goal Parser Interpretation](https://leetcode.com/problems/goal-parser-interpretation/description/)

1. 세상에 3개의 문자밖에없다고 가정한다.
2. 그게 `G` , `()` ,`(al)` 이렇게 총 3개
3. 그래서 이거를 마구잡이로 섞어넣은 문자열을 G O AL로 치환해서 나타내면 끝 

---

> ### 문제 풀이
1. 이전에 비슷한 문제를 풀었던 경험이 있어서 이거는 Replacing으로 대체를 해주면 된다고 생각은했는데, 처음에 아래와 같이 에러가 떠서 좀 당황했던 것 같다. 
2. 당시 분명히 String에 쓰는것으로 기억을 하고 있었는데, no member Method라고 나와버리니, 바로 공식문서를 찾아봤던 것 같다.

<image  src="https://velog.velcdn.com/images/bishoe01/post/81fc6445-2e40-498c-b1a9-7548f44fd840/image.png" style="padding:0; margin:0"/>

#### String에서 쓸 수 있다고 했는데, 대체 왜 없다는걸까? 

[replacingOccurrences 공식문서](https://developer.apple.com/documentation/foundation/nsstring/1416484-replacingoccurrences) 를 보면 `NSString`의 인스턴스 메소드로 정의되어있다. 그러면 `NSString`과 `String`은 다른걸까? 를 이따가 다뤄보도록하고 일단은 
`import Foundation`을 추가하면 정상적으로 사용할 수가 있게 된다. 

> ### 최종 제출 코드 

```swift
import Foundation

class Solution {
    func interpret(_ command: String) -> String {
        return command.replacingOccurrences(of: "()",
                                            with: "o")
            .replacingOccurrences(of: "(al)", with: "al")
    }
}
```

<image  src="https://velog.velcdn.com/images/bishoe01/post/9cae0564-e10f-4432-bebb-76392a010076/image.png" style="padding:0; margin:0"/>


---

> ### 타인의 코드

```swift
class Solution {
    func interpret(_ command: String) -> String {
        let arr = Array(command)
        var str = ""
        var i = 0 
        
        while i < arr.count {
            if arr[i] == "G" {
                str += "G"
                i += 1
            } else if arr[i] == "(" {
                if arr[i+1] == ")" {
                    str += "o"
                    i += 2  // Skip "()"
                } else {
                    str += "al"
                    i += 4  // Skip "(al)"
                }
            }
        }
        return str
    }
}
```

>이게 초기에 생각했던 풀이였다. `(`이 나오면 이게 `(al)` 인지 `()`인지 판단하면서 문자열을 완성시켜주는 로직이다. 아마 문제가 크게 복잡한 문제가 아니라서 이렇게 직관적인 풀이가 제일 빠른 풀이였던 것 같다. 

---


>### NSString VS String ? 

- `String`
  - Swift 표준 라이브러리의 네이티브 타입.
  - 유니코드 기반으로 설계됨(UTF-8 기반).
  - 경량이고 Swift 고유의 특성을 반영(예: 값 타입, 구조체)

- `NSString`
  - Objective-C에서 유래하며, `Foundation` 프레임워크에 속함.
  - 유니코드 지원하지만 내부적으로 UTF-16 기반.
  - 참조 타입(클래스)이며, iOS/macOS 개발에서 레거시 코드와의 호환성을 위해 존재

>#### 그러면 왜 import Foundation을 하니까 가능했던 것? 
Swift는 Foundation을 임포트하면 String과 NSString 간의 브릿지(bridge)를 자동으로 제공 String에서도 NSString의 메서드를 호출할 수 있게 도와준다고 한다. 

>#### 브릿지를 자동으로 제공한다는게 뭔소리인데 ?  -> 브릿징 
`String`과 `NSString`을 자동으로 변환해주는 것 `import Foundation`을 하면 `String`이 `NSString`로 암묵적 캐스팅되어 `NSString`의 메서드를 사용할 수 있다고한다.
"

결국 정리하자면 내가 쓰려했던 메소드는 `NSString`의 메소드이고, `String`타입에서 이걸 사용하려면 `import Foundation`을 통해서 `String`을 `NSString`으로 브릿징(NSString으로 캐스팅)시켜줘서 사용할 수 있는 것 ! 

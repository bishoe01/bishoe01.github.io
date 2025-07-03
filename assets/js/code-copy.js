// 코드 복사 기능
document.addEventListener('DOMContentLoaded', function() {
    // 모든 코드 블록에 복사 버튼 추가
    const codeBlocks = document.querySelectorAll('pre code, .highlight pre, .highlighter-rouge pre');
    
    codeBlocks.forEach(function(codeBlock) {
        // 이미 버튼이 있으면 스킵
        if (codeBlock.parentElement.querySelector('.copy-button')) {
            return;
        }

        // wrapper 요소 생성 또는 기존 것 사용
        let wrapper = codeBlock.closest('.code-block-wrapper');
        if (!wrapper) {
            wrapper = document.createElement('div');
            wrapper.className = 'code-block-wrapper';
            
            // 코드 블록을 wrapper로 감싸기
            const parent = codeBlock.parentElement;
            const grandParent = parent.parentElement;
            grandParent.insertBefore(wrapper, parent);
            wrapper.appendChild(parent);
        }

        // 복사 버튼 생성
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.innerHTML = `
            <svg class="copy-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span class="copy-text">복사</span>
        `;

        // 클릭 이벤트 추가
        copyButton.addEventListener('click', function() {
            // 코드 텍스트 추출
            let codeText = '';
            
            // 코드 블록에서 텍스트 추출 (여러 방법 시도)
            if (codeBlock.textContent) {
                codeText = codeBlock.textContent;
            } else if (codeBlock.innerText) {
                codeText = codeBlock.innerText;
            } else {
                // 하이라이트된 코드의 경우
                const lines = codeBlock.querySelectorAll('.highlight .line, .rouge-code');
                if (lines.length > 0) {
                    codeText = Array.from(lines).map(line => line.textContent).join('\n');
                } else {
                    codeText = codeBlock.textContent || codeBlock.innerText || '';
                }
            }

            // 클립보드에 복사
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(codeText).then(function() {
                    showCopySuccess(copyButton);
                }).catch(function() {
                    fallbackCopy(codeText, copyButton);
                });
            } else {
                fallbackCopy(codeText, copyButton);
            }
        });

        // wrapper에 버튼 추가
        wrapper.appendChild(copyButton);
    });

    // 복사 성공 피드백
    function showCopySuccess(button) {
        // 알림창 생성
        const notification = document.createElement('div');
        notification.className = 'copy-notification';
        notification.textContent = '코드가 클립보드에 복사되었습니다!';
        document.body.appendChild(notification);

        // 알림창 보이기
        setTimeout(() => {
            notification.classList.add('show');
        }, 10); // 약간의 딜레이를 주어 CSS transition이 적용되도록 함

        // 일정 시간 후 알림창 숨기기 및 제거
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300); // transition이 끝난 후 제거
        }, 2000); // 2초 후 사라짐
    }

    // fallback 복사 방법 (구형 브라우저용)
    function fallbackCopy(text, button) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            const successful = document.execCommand('copy');
            if (successful) {
                showCopySuccess(button);
            } else {
                console.error('복사 실패');
            }
        } catch (err) {
            console.error('복사 중 오류 발생:', err);
        }

        document.body.removeChild(textArea);
    }
});

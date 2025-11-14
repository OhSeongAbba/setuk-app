document.getElementById('setuk-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const loadingDiv = document.getElementById('loading');
    const resultDiv = document.getElementById('result');
    loadingDiv.style.display = 'block';
    resultDiv.textContent = '';

    const formData = new FormData(event.target);

    // ------------------------------------------------------------------
    // [중요!] 'app.py'가 배포된 실제 인터넷 주소를 넣습니다. (2단계에서 만듦)
    // ------------------------------------------------------------------
    const BACKEND_URL = 'https://setuk-backend-app.onrender.com/generate';
    // ------------------------------------------------------------------

    try {
        // 이제 로컬(127.0.0.1)이 아닌, 실제 인터넷 서버에 요청을 보냅니다.
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            resultDiv.textContent = data.text;
        } else {
            resultDiv.textContent = '오류 발생: ' + data.error;
        }

    } catch (error) {
        resultDiv.textContent = '서버 연결 오류: ' + error.message;
    } finally {
        loadingDiv.style.display = 'none';
    }
});


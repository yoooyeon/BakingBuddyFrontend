
export const fetchRecipes = async (page: number, size: number) => {
  const response = await fetch(`http://localhost:8080/api/recipes?page=${page}&size=${size}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // 쿠키를 요청에 포함시키기 위한 설정
  });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const json = await response.json();
    return json.data;  
  };
  
export async function isAuthenticated(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        const userToken = localStorage.getItem('logged');
        const isAuthenticated = !!userToken;
        resolve(isAuthenticated);
        console.log(userToken);
      }, 2000); 
    });
  }


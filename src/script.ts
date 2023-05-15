document.addEventListener("DOMContentLoaded", () => {
  const allSideMenu = document.querySelectorAll<HTMLAnchorElement>('#sidebar .side-menu.top li a');

  allSideMenu.forEach((item) => {
    const li = item.parentElement as HTMLLIElement;
  
    item.addEventListener('click', () => {
      console.log('hi');
      allSideMenu.forEach((i) => {
        i.parentElement?.classList.remove('active');
      });
      li.classList.add('active');
      
    });
  });
  
});

export {};

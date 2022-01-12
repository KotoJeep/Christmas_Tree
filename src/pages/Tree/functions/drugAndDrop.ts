import { Toys } from '../../Toys';

export function drugAndDrop() {
  const area = document.querySelector('.tree-wrapper') as HTMLElement;
  let toys = area.querySelectorAll('img') as NodeListOf<HTMLImageElement>;
  const tree = document.querySelector('.tree') as HTMLElement;

  function drag() {
    toys.forEach((toy) => {
      toy.onmousedown = function (event) {
        let shiftX = event.clientX - toy.getBoundingClientRect().left;
        let shiftY = event.clientY - toy.getBoundingClientRect().top;

        function moveAt(pageX: number, pageY: number) {
          toy.style.left = pageX - shiftX + 'px';
          toy.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event: MouseEvent) {
          let x: number =
              event.pageX - area.offsetLeft - tree.offsetLeft + Math.floor(area.clientWidth / 2),
            y: number = event.pageY - area.offsetTop - tree.offsetTop;

          if (x > 0 && y > 0 && x <= area.clientWidth - shiftX && y <= area.clientHeight - shiftY) {
            moveAt(x, y);
          } else {
            area.removeEventListener('mousemove', onMouseMove);
            toy.onmouseup = null;
          }
        }

        area.addEventListener('mousemove', onMouseMove);
        toy.onmouseup = function () {
          area.removeEventListener('mousemove', onMouseMove);
          toy.onmouseup = null;
        };
        toy.ondragstart = function () {
          return false;
        };

        /////////////////////////////////////////////////////////
      };
    });
  }

  const toyBlocks = document.querySelectorAll('.collection__toys-item');
  toyBlocks.forEach((block) => {
    const toyCollection = block.querySelectorAll('.collection__toys-img');
    toyCollection.forEach((ball: HTMLImageElement) => {
      area.addEventListener('dragover', (event) => {
        event.preventDefault();
      });

      let itemOffsetX = 0,
        itemOffsetY = 0;

      ball.addEventListener('mousemove', (event) => {
        const collection = document.querySelector('.collection__toys') as HTMLElement,
          items = collection.querySelectorAll(
            '.collection__toys-item'
          ) as NodeListOf<HTMLImageElement>,
          wrapper = collection.querySelector('.collection__toys-wrapper') as HTMLElement;
        items.forEach((item) => {
          itemOffsetX = event.pageX - item.offsetLeft; // <==============
        });
        // console.log(itemOffsetX);
      });

      ball.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('id', (<HTMLElement>event.target).id);
      });
      ball.addEventListener('dragend', (event) => {
        ball.style.left = `${
          event.pageX - area.offsetLeft - tree.offsetLeft + Math.floor(area.clientWidth / 2)
        }px`;
        ball.style.top = `${event.pageY - area.offsetTop - tree.offsetTop}px`;
      });
    });

    area.addEventListener('drop', (event) => {
      let itemId = event.dataTransfer.getData('id');
      console.log(event.target);
      (<HTMLElement>event.target).append(document.getElementById(itemId));
      toys = area.querySelectorAll('img') as NodeListOf<HTMLImageElement>;
      drag();
      UpdateCounter();
    });
  });
}
export function UpdateCounter() {
  document.querySelectorAll('.collection__toys-item').forEach((collection) => {
    const count = collection.querySelectorAll('img').length;
    collection.querySelector('.collection__toys-count').textContent = `${count}`;
  });
}

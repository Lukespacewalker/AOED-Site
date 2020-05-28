import * as React from "react";

function _scrollToA(anchorElement: HTMLAnchorElement) {
  let target = document.getElementById(
    decodeURIComponent(
      anchorElement.href.substring(anchorElement.href.indexOf("#") + 1)
    )
  ) as HTMLElement;
  if (typeof window !== "undefined" && /Edge/.test(navigator.userAgent)) {
    target.scrollIntoView({ behavior: "smooth", inline: "start" });
  } else {
    let targetY = target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: targetY - 96,
      left: 0,
      behavior: "smooth",
    });
  }
}

export function scrollToId(id: string) {
  let target = document.getElementById(id) as HTMLElement;
  if (typeof window !== "undefined" && /Edge/.test(navigator.userAgent)) {
    setTimeout(function () {
      target.scrollIntoView({ behavior: "smooth", inline: "start" });
    }, 1);
  } else {
    let targetY = target.getBoundingClientRect().top + window.scrollY;
    setTimeout(() => {
      window.scrollTo({
        top: targetY-96,
        left: 0,
        behavior: "smooth",
      });
    }, 1);
  }
}

export function scrollToTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}

export function scrollToAnchor(
  mouseEvent: React.MouseEvent<HTMLAnchorElement, MouseEvent>
) {
  mouseEvent.preventDefault();
  mouseEvent.stopPropagation();
  // Is Anchor Element
  if ((mouseEvent.target as HTMLElement).tagName.toLowerCase() === "a") {
    _scrollToA(mouseEvent.target as HTMLAnchorElement);
  } else {
    let anchorElement: HTMLAnchorElement = null;
    let maxSearch = 10;
    for (let i = 0; i < maxSearch; i++) {
      let parent = (mouseEvent.target as HTMLElement).parentElement;
      if (parent.tagName.toLowerCase() === "a") {
        anchorElement = parent as HTMLAnchorElement;
        _scrollToA(anchorElement);
        break;
      }
    }
  }
}

export default scrollToAnchor;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
document.addEventListener("DOMContentLoaded", function () {
    var allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');
    allSideMenu.forEach(function (item) {
        var li = item.parentElement;
        item.addEventListener('hover', function () {
            console.log('hi');
            allSideMenu.forEach(function (i) {
                var _a;
                (_a = i.parentElement) === null || _a === void 0 ? void 0 : _a.classList.remove('active');
            });
            li.classList.add('active');
        });
    });
});

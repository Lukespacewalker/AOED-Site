/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import "./src/styles/_reset.css";
import "./src/styles/global.scss";

export const onServiceWorkerUpdateReady = () => {
    const answer = window.confirm(
        `เว็บไซต์นี้มีการอัพเดต ` +
        `ต้องรีเฟรสหน้านี้ใหม่ เพื่อแสดงรุ่นล่าสุด?`
    );

    if (answer === true) {
        window.location.reload();
    }
}
/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import "./src/styles/layout.css";
import "./src/styles/global.css";

export const onServiceWorkerUpdateReady = () => {
    const answer = window.confirm(
        `เว็บไซต์นี้มีการอัพเดต ` +
        `ต้องรีเฟรสหน้านี้ใหม่ เพื่อแสดงรุ่นล่าสุด?`
    );

    if (answer === true) {
        window.location.reload();
    }
}
document.addEventListener("DOMContentLoaded", function () {
    // 直接定义允许的域名
    const allowedDomain = "blog.musnow.top";  // 替换为你的主站域名
    // 获取当前页面的域名
    const currentDomain = window.location.hostname;

    // 检查域名是否匹配
    if (currentDomain !== allowedDomain) {
        // 创建横幅提醒
        const banner = document.createElement("div");
        banner.id = "domainMismatchBanner";

        // 动态生成链接
        const link = document.createElement("a");
        link.href = "https://" + allowedDomain; // 设置链接的href属性为allowedDomain
        link.target = "_blank";  // 在新窗口或标签页中打开链接
        link.style.color = "#b8dbff";
        link.style.textDecoration = "underline";
        link.innerText = "主站";

        // 将链接添加到横幅内容中
        banner.appendChild(document.createTextNode("您当前访问的是镜像站，如果"));
        banner.appendChild(link);
        banner.appendChild(document.createTextNode("无法访问，请联系站长，感谢！"));

        // 将横幅应用CSS样式
        banner.style.backgroundColor = "#fb7070";
        banner.style.color = "#fff";
        banner.style.textAlign = "center";
        banner.style.padding = "3px";
        banner.style.position = "fixed";
        banner.style.bottom = "0";  // 将top改为bottom
        banner.style.left = "0";
        banner.style.width = "100%";
        banner.style.zIndex = "1000";

        // 将横幅添加到body
        document.body.appendChild(banner);
    }
});

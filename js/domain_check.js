document.addEventListener("DOMContentLoaded", function () {
    // Base64编码后的主站域名
    const encodedMainDomain = "YmxvZy5tdXNub3cudG9w"; // 对应 "blog.musnow.top"

    // Base64编码后的有效域名列表，支持通配符
    const encodedDomainList = [
        'Ki5tdXNub3cudG9w', // 对应 '*.musnow.top'
        'bXVzbm93cy5naXRodWIuaW8', // 对应 'musnows.github.io'
        'bXVzbm93Lm5ldGxpZnkuYXBw', // 对应 'musnow.netlify.app'
        'aGV4by1ibG9nLWpzdnoudmVyY2VsLmFwcA==', // 对应 'hexo-blog-jsvz.vercel.app'
        'aGV4by1ibG9nLTR6OS5wYWdlcy5kZXY=' // 对应cf的 'hexo-blog-4z9.pages.dev'
    ];

    // 对Base64编码后的域名和URL进行解码
    function decodeBase64(encodedStr) {
        return atob(encodedStr);
    }

    // 解码后的主站域名
    const mainDomain = decodeBase64(encodedMainDomain);

    // 解码后的域名列表
    const domainList = encodedDomainList.map(decodeBase64);

    // 判断域名是否在列表中
    function isDomainInList(domain, domainList) {
        // 将通配符域名转换为正则表达式
        const convertToRegex = (wildcard) => {
            return new RegExp('^' + wildcard.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$');
        };

        return domainList.some(wildcardDomain => {
            const regex = convertToRegex(wildcardDomain);
            return regex.test(domain);
        });
    }

    function addInfoBanner(preFix, url, urlText, postFix) {
        // 创建横幅提醒
        const banner = document.createElement("div");
        banner.id = "domainMismatchBanner";

        // 横幅前置语句
        banner.appendChild(document.createTextNode(preFix));
        // 将链接添加到横幅内容中
        if (url) {
            const link = document.createElement("a");
            link.href = "https://" + url + "/?utm_source=domain_check"; // 设置链接的href属性为allowedDomain
            link.target = "_blank";  // 在新窗口或标签页中打开链接
            link.style.color = "#b8dbff";
            link.style.textDecoration = "underline";
            link.innerText = urlText;
            // 有url才添加link
            banner.appendChild(link);
        }
        // 链接后缀
        banner.appendChild(document.createTextNode(postFix));

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

    // 获取当前页面的域名
    const currentDomain = window.location.hostname;
    // 判断当前域名是否在域名列表中
    if (currentDomain == 'localhost') {
        // console.log('本地测试localhost域名');
        addInfoBanner('当前访问的是本地测试站点，可点击', mainDomain, '主站', '访问在线站点。');
    }
    else if (!isDomainInList(currentDomain, domainList)) {
        // console.log('域名非有效域名');
        addInfoBanner('当前域名非本站域名，可能是恶意镜像站。请点击', mainDomain, '主站', '正常访问本站。请联系站长举报非本站域名，感谢！');
        // 睡眠函数
        function sleep(time) {
            return new Promise((resolve) => setTimeout(resolve, time));
        }
        // 睡6s,之后执行下面的内容，重定向到主站
        sleep(6000).then(() => {
            window.location.replace("https://" + mainDomain + "/?utm_source=illegal_domain&illegal_domain=" + currentDomain);
        })
    } else if (currentDomain !== mainDomain) {
        // console.log('域名非主站域名，是镜像站');
        addInfoBanner('您当前访问的是镜像站，如果', mainDomain, '主站', '无法访问，请联系站长，感谢！');
    }

    // 再检查用户是否是从非法域名重定向过来的
    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get('utm_source');
    // 判断查询参数是否包含指定内容
    if (utmSource === 'illegal_domain') {
        // console.log('检测到非法域名重定向，执行相应操作');
        addInfoBanner('您被自动从非法域名重定向到了本站的主站，请在', mainDomain + '/qa', '留言', '页面发送评论告知站长，感谢！');
    }
});

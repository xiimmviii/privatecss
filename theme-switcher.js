document.addEventListener("DOMContentLoaded", function () {
    console.log("Script chargé !");

    // Définition des styles (Dark Mode = mode de base, donc pas de fichier CSS pour lui)
    let styles = [
        { name: "🌙", url: "" }, // Dark Mode (CSS du forum par défaut)
        { name: "☀️", url: "https://xiimmviii.github.io/privatecss/lightmode.css" },
        { name: "🌤️", url: "https://xiimmviii.github.io/privatecss/lightmodeplus.css" },
        { name: "⚫", url: "https://xiimmviii.github.io/privatecss/fademode.css" }
    ];

    // Ajouter la balise <link> pour appliquer le style si nécessaire
    let link = document.createElement("link");
    link.id = "tstyle";
    link.rel = "stylesheet";
    link.type = "text/css";
    document.head.appendChild(link);

    // Vérifier si un style est sauvegardé dans les cookies
    let savedStyle = document.cookie.replace(/(?:(?:^|.*;\s*)sstyle\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    let currentIndex = styles.findIndex(style => style.url === savedStyle);

    // Appliquer le mode sauvegardé, sinon laisser le Dark Mode par défaut
    if (currentIndex === -1) currentIndex = 0;
    if (styles[currentIndex].url) {
        link.href = styles[currentIndex].url;
    } else {
        link.remove(); // Dark Mode, donc on enlève le fichier CSS
    }

    // Créer un bouton pour changer de mode
    let themeButton = document.createElement("button");
    themeButton.id = "themeSwitcher";
    themeButton.innerHTML = styles[currentIndex].name;
    themeButton.style.position = "fixed";
    themeButton.style.top = "30px";
    themeButton.style.left = "75px";
    themeButton.style.padding = "0px";
    themeButton.style.fontSize = "25px";
    themeButton.style.cursor = "pointer";
    themeButton.style.borderRadius = "10%";
    themeButton.style.border = "none";
    themeButton.style.background = "transparent";
    themeButton.style.color = "";
    themeButton.style.zIndex = "9999";
    document.body.appendChild(themeButton);

    // Changer de mode au clic
    themeButton.addEventListener("click", function () {
        currentIndex = (currentIndex + 1) % styles.length;
        if (styles[currentIndex].url) {
            link.href = styles[currentIndex].url;
            document.head.appendChild(link);
        } else {
            link.remove();
        }
        themeButton.innerHTML = styles[currentIndex].name;
        document.cookie = "sstyle=" + styles[currentIndex].url + ";path=/;max-age=31536000"; // Cookie valable 1 an
        console.log("Mode changé :", styles[currentIndex].name);
    });

    console.log("Mode par défaut (Dark Mode) chargé !");
});

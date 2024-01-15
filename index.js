const download = document.querySelector(".download");
const escuro = document.querySelector(".escuro");
const claro = document.querySelector(".claro");
const qrContainer = document.querySelector("#qr-code");
const textoQR = document.querySelector(".texto-qr");
const compartilharBotao = document.querySelector(".compartilhar-botao");
const tamanhos = document.querySelector(".tamanhos");

escuro.addEventListener("input", CorEscura);
claro.addEventListener("input", CorClara);
textoQR.addEventListener("input", QRTexto);
tamanhos.addEventListener("change", ajustarTamanho);
compartilharBotao.addEventListener("click", compartilhar);


const urlPadrao = "https://github.com/camilatavdev";
let colorLight = "#fff",
    colorDark = "#000",
    text = urlPadrao,
    size = 300;

function CorEscura(e) {
    colorDark = e.target.value;
    gerarQRCode();
}

function CorClara(e) {
    colorLight = e.target.value;
    gerarQRCode();
}

function QRTexto(e) {
    const value = e.target.value;
    text = value;
    if (!value) {
        text = urlPadrao;
    }
    gerarQRCode();
}

async function gerarQRCode() {
    qrContainer.innerHTML = "";
    new QRCode("qr-code", {
        text,
        height: size,
        width: size,
        colorLight,
        colorDark,
    });
    download.href = await resolveDataUrl();
}

async function compartilhar() {
    setTimeout(async () => {
        try {
            const base64url = await resolveDataUrl();
            const blob = await (await fetch(base64url)).blob();
            const file = new File([blob], "QRCode.png", {
                type: blob.type,
            });
            await navigator.share({
                files: [file],
                title: text,
            });
        } catch (error) {
            alert("Your browser doesn't support sharing.");
        }
    }, 100);
}

function ajustarTamanho(e) {
    size = e.target.value;
    gerarQRCode();
}

function resolveDataUrl() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const img = document.querySelector("#qr-code img");
            if (img.currentSrc) {
                resolve(img.currentSrc);
                return;
            }
            const canvas = document.querySelector("canvas");
            resolve(canvas.toDataURL());
        }, 50);
    });
}
gerarQRCode();
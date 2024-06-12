# Launch on windows without elevation : 

PS C:\Users\USER\Documents\Github\kigoApp> winget install Schniz.fnm

PS C:\Users\USER\Documents\Github\kigoApp> $fnmPath = "C:\Users\USER\AppData\Local\Microsoft\WinGet\Packages\Schniz.fnm_Microsoft.Winget.Source_8wekyb3d8bbwe"

PS C:\Users\USER\Documents\Github\kigoApp> $env:PATH = "$fnmPath;" + $env:PATH

PS C:\Users\USER\Documents\Github\kigoApp> fnm --version
fnm 1.37.0

PS C:\Users\USER\Documents\Github\kigoApp> $fnmEnv = fnm env

PS C:\Users\USER\Documents\Github\kigoApp> Invoke-Expression ($fnmEnv -join "`n")

PS C:\Users\USER\Documents\Github\kigoApp> fnm use --install-if-missing 20

PS C:\Users\USER\Documents\Github\kigoApp> npm install

PS C:\Users\USER\Documents\Github\kigoApp> npm run dev


FOR THE API, use Vercel / Firebase  ...

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh




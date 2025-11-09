# Module 5 Explore The Basic Types Of Typescript

---

## 5-1,2 Install NodeJs using NVM

To install NodeJs using NVM, you first need to uninstall your current NodeJs version. Since NVM is a tool for managing NodeJs versions, follow the steps below:
- if you are using Windows Go to **Settings** → **Apps** → **Installed apps** search for **Node.js** and uninstall it.
- Delete **npm cache** & **config folders** 

    > 💡 Cleanup leftover npm folders <br/> 
    > After uninstalling Node.js, delete these folders if they exist:

    ```text
    %AppData%\npm                 # Global npm packages (user-specific)
    %AppData%\npm-cache           # npm package cache
    %LocalAppData%\npm-cache      # Additional cache (Windows-specific)
    C:\npm                        # Your custom global prefix (if used)
    ```

### Now You Are Ready To Install Node.js

1. Go to [https://www.nvmnode.com/guide/download.html](https://www.nvmnode.com/guide/download.html)
2. Download and install **NVM for Windows** (use the `nvm-setup.exe` installer — it’s recommended for most users).

   >💡 **After installation, open a new Command Prompt (CMD) or PowerShell**  
   >*(You must open a new terminal for nvm to be recognized.)*

3) Verify that NVM is installed

    ```bash
    nvm --version
    ```
    ✅ You should see a version number like `1.1.12` or `1.2.2`.

    :::warning
    If you get `'nvm' is not recognized`..., restart your computer or double-check that the installer added NVM to your system PATH. 
    :::

4) Install a Node.js version

    ```bash
    nvm install <version>
    ```
    > 📌 This downloads Node.js and npm together into your NVM-managed directory (e.g., `C:\Users\<you>\AppData\Roaming\nvm`). 

5) Use the installed version

    ```bash
    nvm use <version>
    ```

6) Confirm Node.js and npm are working

    ```js
    node -v
    npm -v

    // You should see something like:
    // v24.11.0
    // 11.6.1
    ```
    >🎉 Congratulations! You now have a clean, NVM-managed Node.js environment — ready for TypeScript, DSA practice, and more

import "https://unpkg.com/navigo"  //Will create the global Navigo object used below


import {
    setActiveLink, adjustForMissingHash, renderTemplate, loadHtml, sanitizeStringWithTableRows
} from "./util.js"

import { setupSignIn } from "./pages/public/public.js";
import { setupPrivate } from "./pages/protected/private/private.js";
import { setupAdmin } from "./pages/protected/admin/admin.js";


const content = 'content'

window.addEventListener("load", async () => {

  const templateSignIn = await loadHtml("./pages/public/public.html")
  const templatePrivate = await loadHtml("./pages/protected/private/private.html")
  const templateAdmin = await loadHtml("./pages/protected/admin/admin.html")
  const templateNotFound = await loadHtml("./pages/notFound/notFound.html")


  adjustForMissingHash()

    const router = new Navigo("/", {hash: true});
    //Not especially nice, BUT MEANT to simplify things. Make the router global so it can be accessed from all js-files
    window.router = router

    router
        .hooks({
            before(done, match) {
                setActiveLink("menu", match.url)
                done()
            }
        })
        .on({
          "/": () => {
                renderTemplate(templateSignIn, content)
                setupSignIn()
            },
            '/private': () => {
                renderTemplate(templatePrivate, content)
                setupPrivate()
            },
            '/admin': () => {
                renderTemplate(templateAdmin, content)
                setupAdmin()
            },
            '/sign-out': () => {
                localStorage.removeItem('jwt')
                window.router.navigate('/')
            }
        })
        .notFound(() => {
            renderTemplate(templateNotFound, content)
        })
        .resolve()
});


window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
    alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber
        + ' Column: ' + column + ' StackTrace: ' + errorObj);
}



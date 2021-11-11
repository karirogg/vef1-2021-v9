// TODO importa því sem nota þarf
import {
  createCategoryBackLink,
  fetchAndRenderCategory,
  fetchAndRenderLists,
} from './lib/ui.js';
import { empty } from './lib/helpers.js';

/** Fjöldi frétta til að birta á forsíðu */
const CATEGORY_ITEMS_ON_FRONTPAGE = 5;

/** Vísun í <main> sem geymir allt efnið og við búum til element inn í */
const main = document.querySelector('main');

/**
 * Athugar útfrá url (`window.location`) hvað skal birta:
 * - `/` birtir yfirlit
 * - `/?category=X` birtir yfirlit fyrir flokk `X`
 */
function route() {
  // Athugum hvort það sé verið að biðja um category í URL, t.d.
  // /?category=menning
  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.has('category')) {
    const backLink = createCategoryBackLink(main, CATEGORY_ITEMS_ON_FRONTPAGE);
    fetchAndRenderCategory(searchParams.get('category'), main, backLink);
  } else {
    fetchAndRenderLists(main, CATEGORY_ITEMS_ON_FRONTPAGE);
  }
}

/**
 * Sér um að taka við `popstate` atburð sem gerist þegar ýtt er á back takka í
 * vafra. Sjáum þá um að birta réttan skjá.
 */
window.onpopstate = () => {
  // TODO útfæra
  empty(main);
  route();
};

// Í fyrsta skipti sem vefur er opnaður birtum við það sem beðið er um út frá URL
route();

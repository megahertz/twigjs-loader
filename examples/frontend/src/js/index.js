import indexView from './views/index.twig';

document.body.innerHTML = indexView({
  url: location.href,
})

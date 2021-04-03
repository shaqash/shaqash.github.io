module.exports = {
  mount: {
    public: { url: '/', static: true, resolve: false },
    src: '/dist',
  },
  optimize: {
    bundle: true,
    minify: true,
    target: 'es2018',
  },
  buildOptions: {
    out: 'docs',
  },
};

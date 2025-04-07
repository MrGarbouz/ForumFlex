module.exports = {
    // ... votre configuration existante
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto',
        },
        // autres règles
      ],
    },
  };
  
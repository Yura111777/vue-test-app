const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    module: {
      rules: [
        // ... другие правила опущены

        // это правило будет применяться к обычным файлам `.scss`
        // А ТАКЖЕ к секциям `<style lang="scss">` в файлах `.vue`
        {
          test: /\.scss$/,
          use: ["sass-loader"],
        },
      ],
    },
  },
})

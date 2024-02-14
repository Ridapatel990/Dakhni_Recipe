const config = {
  //   initialRouteName: "Landing",
  screens: {
    SignInPage: "SignInPage",
    RecipeDescription: {
      path: "RecipeDescription/:id",
      stringify: {
        id: (id: any) => id,
      },
    },
    HomeScreen: "HomeScreen",
  },
};

const linking = {
  prefixes: ["dakhnirecipe://", "http://www.dakhnirecipe.com"],
  config,
};

export default linking;

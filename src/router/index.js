import Vue from "vue";
import VueRouter from "vue-router";

// 1.安装插件
Vue.use(VueRouter);
// 2.创建router实例
const Home = () => import("views/home/Home");
const Category = () => import("views/category/Category");
const Shopcart = () => import("views/shopcart/Shopcart");
const Profile = () => import("views/profile/Profile");
const Detail = () => import("views/detail/Detail");
const routes = [
  { path: "", redirect: "/home" },
  { path: "/home", component: Home },
  { path: "/category", component: Category },
  { path: "/shopcart", component: Shopcart },
  { path: "/profile", component: Profile },
  { path: "/detail", component: Detail }
];
const router = new VueRouter({
  routes,
  mode: "history"
});
// 3.导出
export default router;

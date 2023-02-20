import { createRouter, createWebHistory } from "vue-router";
import CodeVerification from "../views/CodeVerification.vue";
import MyPage from "../views/MyPage.vue";
import SignIn from "../views/SignIn.vue";
import TopView from "../views/TopView.vue";
import MainPage from "@/views/MainPage.vue";

const DEFAULT_TITLE = "RE:";

const routes = [
  {
    path: "/",
    name: "top",
    component: MainPage,
    meta: {
      title: `${DEFAULT_TITLE}  Main`,
    },
  },
  {
    path: "/code-verification",
    name: "code-verification",
    component: CodeVerification,
    meta: {
      title: `${DEFAULT_TITLE}  Code Verification`,
    },
  },
  {
    path: "/sign-in",
    name: "sign-in",
    component: SignIn,
    meta: {
      title: `${DEFAULT_TITLE}  Sign In`,
    },
  },
  {
    path: "/mypage",
    name: "mypage",
    component: MyPage,
    meta: {
      title: `${DEFAULT_TITLE}  My Page`,
    },
  },

  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

function setPageTitleMiddleware(to: any, from: any, next: any) {
  const pageTitle = to.matched.find((record: any) => record.meta.title);

  if (pageTitle) {
    window.document.title = pageTitle.meta.title;
  }

  next();
}

router.beforeEach(setPageTitleMiddleware);

export default router;

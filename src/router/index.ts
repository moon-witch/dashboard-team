import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/public/Login.vue";
import { supabase } from "../supabase"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/news",
      name: "news",
      meta: {
        requiresAuth: true,
      },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/authenticated/News.vue"),
    },
    {
      path: "/guides",
      name: "guides",
      meta: {
        requiresAuth: true,
      },
      component: () => import("../views/authenticated/Guides.vue"),
    },
    {
      path: "/tools",
      name: "tools",
      meta: {
        requiresAuth: true,
      },
      component: () => import("../views/authenticated/Tools.vue"),
    },
    {
      path: "/ideas",
      name: "ideas",
      meta: {
        requiresAuth: true,
      },
      component: () => import("../views/authenticated/Ideas.vue"),
    },
    {
      path: "/acc",
      name: "acc",
      meta: {
        requiresAuth: true,
      },
      component: () => import("../components/Account.vue"),
    },
    /* {
      path: "/profile",
      name: "profile",
      meta: {
        requiresAuth: true,
      },
      component: () => import("../views/user/Profile.vue"),
    },
    {
      path: "/profile/edit",
      name: "edit-profile",
      meta: {
        requiresAuth: true,
      },
      component: () => import("../views/user/EditProfile.vue"),
    }, */
  ],
});

router.beforeEach(async (to, from, next) => {
  // get current user info
  const { data: { user } } = await supabase.auth.getUser()
  const requiresAuth = to.matched.some
  (record => record.meta.requiresAuth);

  if(requiresAuth && user == null) next('/');
  else if(to.name == '/' && user != null) next("/news");
  else next();
})

export default router;

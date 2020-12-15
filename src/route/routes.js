
const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import('@/views/home'),
        meta: {
            title: "首页",
            keepAlive: false
        }
    },
]

export default routes;
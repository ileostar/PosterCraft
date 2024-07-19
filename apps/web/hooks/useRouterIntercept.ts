import { useRouter } from 'next/navigation';

/**
 * 拦截路由，检查是否已登录
 * @returns 无返回值
 */
export function useRouterIntercept() {
    const router = useRouter();
    if (typeof window !== 'undefined') {
        const token=window.localStorage.getItem("token");
        if(!token){
            router.push("/login");
        }
      }
    }
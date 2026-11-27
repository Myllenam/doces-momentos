/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/carrinho` | `/carrinho`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/favoritos` | `/favoritos`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `/+not-found`, params: Router.UnknownInputParams & {  } } | { pathname: `/produto/[id]`, params: Router.UnknownInputParams & { id: string | number; } };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/carrinho` | `/carrinho`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/favoritos` | `/favoritos`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}` | `/`; params?: Router.UnknownOutputParams; } | { pathname: `/+not-found`, params: Router.UnknownOutputParams & {  } } | { pathname: `/produto/[id]`, params: Router.UnknownOutputParams & { id: string; } };
      href: Router.RelativePathString | Router.ExternalPathString | `/_sitemap${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/carrinho${`?${string}` | `#${string}` | ''}` | `/carrinho${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/favoritos${`?${string}` | `#${string}` | ''}` | `/favoritos${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString | Router.ExternalPathString | `/_sitemap` | `${'/(tabs)'}/carrinho` | `/carrinho` | `${'/(tabs)'}/favoritos` | `/favoritos` | `${'/(tabs)'}` | `/`; params?: Router.UnknownInputParams; } | `/+not-found${`?${string}` | `#${string}` | ''}` | `/produto/${Router.SingleRoutePart<T>}` | { pathname: `/+not-found`, params: Router.UnknownInputParams & {  } } | { pathname: `/produto/[id]`, params: Router.UnknownInputParams & { id: string | number; } };
    }
  }
}

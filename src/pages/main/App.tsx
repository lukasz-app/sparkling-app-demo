import { useCallback, useEffect, useState } from '@lynx-js/react';
import * as router from 'sparkling-navigation';

import './App.css';
import sparklingLogo from '../../assets/sparkling_icon.png';

export function App(props: { onMounted?: () => void }) {
  const [scheme, setScheme] = useState(
    'hybrid://lynxview_page?bundle=main.lynx.bundle&title=Sparkling'
  );
  const [lastResult, setLastResult] = useState<string | null>(null);
  const secondPageScheme =
    'hybrid://lynxview_page?bundle=second.lynx.bundle&title=Second%20Page&screen_orientation=portrait';
  const thirdPageScheme =
    'hybrid://lynxview_page?bundle=third.lynx.bundle&title=Third%20Page&screen_orientation=portrait';

  useEffect(() => {
    console.info('Hello, Sparkling template');
    props.onMounted?.();
  }, [props]);

  const openWithScheme = useCallback((targetScheme: string) => {
    router.open({ scheme: targetScheme }, (result: router.OpenResponse) => {
      setLastResult(JSON.stringify(result));
    });
  }, []);

  const openScheme = useCallback(() => {
    openWithScheme(scheme);
  }, [openWithScheme, scheme]);

  const openSecondPage = useCallback(() => {
    openWithScheme(secondPageScheme);
  }, [openWithScheme, secondPageScheme]);

  const openThirdPage = () => {
    router.open({ scheme: thirdPageScheme }, (result: router.OpenResponse) => {
      console.log('Router open page callback: ', result.code, ' ', result.msg);
    });
  };

  return (
    <scroll-view className="page-scroll" scroll-orientation="vertical">
      <view className="app">
        <view className="hero">
          <text className="eyebrow">Sparkling · LynxJS</text>
          <image src={sparklingLogo} className="logo" />
          <text className="title">Sparkling Starter</text>
        </view>
        <view className="card">
          <view className="card__header">
            <text className="card__title">Multi page demo</text>
            <text className="card__tag card__tag--outline">Router</text>
          </view>
          <view className="primary" bindtap={openSecondPage}>
            <text className="primary__text">Open second page</text>
            <text className="primary__icon">→</text>
          </view>
          <view className="primary" bindtap={openThirdPage}>
            <text className="primary__text">Open third page</text>
            <text className="primary__icon">→</text>
          </view>
        </view>
      </view>
    </scroll-view>
  );
}

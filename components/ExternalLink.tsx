
import { Link, type Href } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import { Platform } from 'react-native';

type Props = {
  href: Href;
  children: React.ReactNode;
};

export default function ExternalLink({
  href,
  children,
}: Props) {
  return (
    <Link
      href={href}
      target="_blank"
      onPress={(event) => {
        if (Platform.OS !== 'web') {
          event.preventDefault();
          openBrowserAsync(String(href));
        }
      }}
    >
      {children}
    </Link>
  );
}


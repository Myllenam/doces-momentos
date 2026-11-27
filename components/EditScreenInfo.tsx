
import { Link, type LinkProps } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import { Platform } from 'react-native';

type Props = Omit<LinkProps, 'href'> & {
  href: `https://${string}` | `http://${string}`;
};

export default function ExternalLink({
  href,
  ...rest
}: Props) {
  return (
    <Link
      {...rest}
      href={href}
      target="_blank"
      onPress={(event) => {
        if (Platform.OS !== 'web') {
          event.preventDefault();
          openBrowserAsync(href);
        }

        rest.onPress?.(event);
      }}
    />
  );
}

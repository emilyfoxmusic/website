import { PageProps } from 'gatsby';
import React from 'react';

import Layout from 'components/Layout';
import SEO from 'components/SEO';
import TextLink from 'components/TextLink';
import { PageHeading } from 'components/Typography';
import { trackExternalLinkClick } from 'helpers/goatcounter';

const Tech: React.FC<PageProps> = ({ location }) => (
  <Layout>
    <SEO
      title="Tech"
      description="A dive into the free and open source software the powers Emily Fox Music."
      location={location}
    />
    <PageHeading>Tech</PageHeading>
    <p>
      I started out using free and open source software (FOSS) because it was
      what I had available, growing up with a Gentoo die-hard as a father
      (thanks, dad!). But it soon became a conscious choice, and when I came to
      trying my hand at music and video production, that was where I naturally
      went.
    </p>
    <p>
      I have used a few different programs over the years, but I think I'm
      relatively settled on my tooling of choice now.
    </p>
    <p>My current toolset is:</p>
    <ul>
      <li>
        <b>Operating system</b>:{' '}
        <TextLink
          openInNewTab
          href="https://www.bunsenlabs.org/"
          onClick={(): void => trackExternalLinkClick('Bunsenlabs')}>
          BunsenLabs
        </TextLink>{' '}
        and{' '}
        <TextLink
          openInNewTab
          href="https://manjaro.org/"
          onClick={(): void => trackExternalLinkClick('Manjaro')}>
          Manjaro
        </TextLink>
      </li>
      <li>
        <b>Digital Audio Workstation (DAW)</b>:{' '}
        <TextLink
          openInNewTab
          href="https://ardour.org/"
          onClick={(): void => trackExternalLinkClick('Ardour')}>
          Ardour
        </TextLink>
      </li>
      <li>
        <b>Video editor</b>:{' '}
        <TextLink
          openInNewTab
          href="https://www.openshot.org/"
          onClick={(): void => trackExternalLinkClick('Openshot')}>
          Openshot
        </TextLink>
      </li>
      <li>
        <b>Synthesisers</b>:{' '}
        <TextLink
          openInNewTab
          href="https://zynaddsubfx.sourceforge.io/"
          onClick={(): void => trackExternalLinkClick('ZynAddSubFX')}>
          ZynAddSubFX
        </TextLink>{' '}
        and{' '}
        <TextLink
          openInNewTab
          href="https://tytel.org/helm/"
          onClick={(): void => trackExternalLinkClick('Helm')}>
          Helm
        </TextLink>
      </li>
      <li>
        Other notable mentions:
        <ul>
          <li>
            <TextLink
              openInNewTab
              href="https://calf-studio-gear.org/"
              onClick={(): void => trackExternalLinkClick('Calf')}>
              Calf studio gear
            </TextLink>
          </li>
          <li>
            <TextLink
              openInNewTab
              href="https://qjackctl.sourceforge.io/"
              onClick={(): void => trackExternalLinkClick('QJackCtl')}>
              QjackCtl
            </TextLink>
          </li>
          <li>
            <TextLink
              openInNewTab
              href="https://www.gimp.org/"
              onClick={(): void => trackExternalLinkClick('Gimp')}>
              Gimp
            </TextLink>
          </li>
          <li>
            <TextLink
              openInNewTab
              href="https://inkscape.org/"
              onClick={(): void => trackExternalLinkClick('Inkscape')}>
              Inkscape
            </TextLink>
          </li>
        </ul>
      </li>
    </ul>
    <p>
      I'm always up for chatting FOSS if you have any questions - come say hi!
    </p>
  </Layout>
);

export default Tech;

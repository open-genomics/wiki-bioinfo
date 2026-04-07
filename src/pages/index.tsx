import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Hero from '@site/src/components/home/Hero';
import {
  FeaturesSection,
  KnowledgeMapSection,
  LearningPathsSection,
  BridgeSection,
  ContributionSection,
} from '@site/src/components/home/Sections';

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title={siteConfig.title} description="BioInfo Wiki 首页">
      <Hero />
      <main>
        <FeaturesSection />
        <KnowledgeMapSection />
        <LearningPathsSection />
        <BridgeSection />
        <ContributionSection />
      </main>
    </Layout>
  );
}

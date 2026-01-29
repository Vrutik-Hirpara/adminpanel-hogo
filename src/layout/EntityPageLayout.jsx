import PageContainer from "../layout/PageContainer";
import ActionButtons from "../components/form/ActionButton";
import SectionTitle from "../components/form/SectionTitle";

export default function EntityPageLayout({
  title,
  showBack = false,
  onBack,
  children,
}) {
  return (
    <PageContainer>
      <div className="flex justify-between items-center mb-4">
        <SectionTitle title={title} />
        {showBack && <ActionButtons showBack onBack={onBack} />}
      </div>

      <div className="w-full max-w-6xl mx-auto">
        {children}
      </div>
    </PageContainer>
  );
}

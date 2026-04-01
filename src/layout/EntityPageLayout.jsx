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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 w-full">
        <SectionTitle title={title} />
        {showBack && <ActionButtons showBack onBack={onBack} />}
      </div>

      <div className="w-full max-w-7xl mx-auto">
        {children}
      </div>
    </PageContainer>
  );
}

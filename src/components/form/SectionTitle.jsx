import { themes } from "../../config/theme.config";

export default function SectionTitle({ title }) {
  return (
    <div className="mb-6">
      <h2
        className="text-sm font-bold tracking-wider uppercase"
        style={{
          color: themes.textDark,
          fontFamily: themes.fontPrimary,
        }}
      >
        {title}
      </h2>

      <div
        className="mt-2 h-[3px] w-10 rounded"
        style={{ backgroundColor: themes.primary }}
      />
    </div>
  );
}

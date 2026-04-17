import { themes } from "../../config/theme.config";

export default function SectionTitle({ title }) {
  return (
    <div className="">
      <h2
        className="text-sm font-bold tracking-wider uppercase"
        style={{
          color: themes.textDark,
          fontFamily: themes.fontPrimary,
        }}
      >
        {title}
      </h2>

    {title &&  <div
        className="mt-2 h-[3px] w-10 rounded"
        style={{ backgroundColor: themes.primary }}
      />}
    </div>
  );
}

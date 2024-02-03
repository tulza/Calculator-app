export class ThemeUtils {
  static Theme = "Default";

  static GetTheme = () => {
    return this.Theme;
  };

  static SetTheme = (Theme: string) => {
    this.Theme = Theme;
    console.log();
    document.documentElement.setAttribute("data-theme", Theme);
  };
}

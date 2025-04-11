import { Palette } from "lucide-react";
import themes from "../themes/themes";
import useThemeStore from "../store/useThemeStore";

const ThemeDropDown = () => {
  const { setTheme } = useThemeStore();
  return (
    <div class="dropdown dropdown-bottom dropdown-end z-100 relative">
      <div tabIndex="0" role="button" class="btn m-1">
        Theme <Palette />
      </div>
      <ul
        tabIndex="0"
        class="dropdown-content menu text-left bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
      >
        {themes.map((theme) => {
          return (
            <li key={theme}>
              <button
                className="justify-between"
                onClick={() => {
                  setTheme(theme.toLowerCase());
                  console.log(theme.toLowerCase());
                }}
              >
                {theme}
                <div
                  className="h-4 w-16 rounded grid grid-cols-4 bg-transparent"
                  data-theme={theme.toLowerCase()}
                >
                  <div className="rounded-full bg-primary"></div>
                  <div className="rounded-full bg-secondary"></div>
                  <div className="rounded-full bg-accent"></div>
                  <div className="rounded-full bg-neutral"></div>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ThemeDropDown;

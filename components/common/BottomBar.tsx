import { sidebarLinks } from "@/config/constants";
import NavLinkItem from "@/components/common/NavLinkItem";

const BottomBar: React.FC = () => {
  return (
    <footer className="bottombar">
      <div className="bottombar_container">
        {sidebarLinks.map((link) => (
          <NavLinkItem
            key={`footer__${link.label}`}
            link={link}
            linkClasses="bottombar_link"
            labelStyles="text-[12px] font-semibold leading-2 text-light-1 max-sm:hidden"
          />
        ))}
      </div>
    </footer>
  );
};

export default BottomBar;

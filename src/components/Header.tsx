import { Activity, MessageCircle } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full py-4 px-4 md:px-6">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-button">
              <Activity className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-accent flex items-center justify-center">
              <MessageCircle className="w-3 h-3 text-accent-foreground" />
            </div>
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground">
              Health<span className="text-primary">Connect</span>
            </h1>
            <p className="text-xs text-muted-foreground hidden sm:block">
              Bulk WhatsApp Messaging
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground bg-secondary px-3 py-1.5 rounded-full">
            Healthcare Edition
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;

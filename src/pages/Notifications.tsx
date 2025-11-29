import { Bell } from "lucide-react";

export const Notifications = () => {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      {/* Page Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Bell className="h-12 w-12 text-luxury-gold" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Notifications
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Stay updated with the latest news and updates from Tomus Footwear
        </p>
      </div>

      {/* Empty State */}
      <div className="max-w-md mx-auto text-center">
        <div className="bg-muted/50 rounded-2xl p-8">
          <Bell className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">
            No notifications yet
          </h2>
          <p className="text-muted-foreground">
            When you have new notifications, they'll appear here.
          </p>
        </div>
      </div>
    </div>
  );
};

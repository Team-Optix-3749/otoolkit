"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Upload,
  FileText,
  Calendar,
  User,
  Trash2,
  RefreshCw
} from "lucide-react";
import { toast } from "sonner";

import { getAllResponses, uploadResponses, dexie } from "@/lib/db/scouting";
import type { DexieScoutingSubmission } from "@/lib/types/scoutingTypes";
import { useNavbar } from "@/hooks/useNavbar";

export default function ResponsesPage() {
  const [responses, setResponses] = useState<DexieScoutingSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  const { setDefaultShown, setMobileNavbarSide } = useNavbar();

  useEffect(() => {
    setDefaultShown(false);
    setMobileNavbarSide("right");
  }, [setDefaultShown]);

  const loadResponses = async () => {
    setIsLoading(true);
    try {
      const data = await getAllResponses();
      setResponses(data);
    } catch (error) {
      console.error("Failed to load responses:", error);
      toast.error("Failed to load responses");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async () => {
    setIsUploading(true);
    try {
      await uploadResponses();
      toast.success("Responses uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload responses");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteResponse = async (id: number) => {
    try {
      await dexie.responses.delete(id);
      await loadResponses(); // Refresh the list
      toast.success("Response deleted successfully");
    } catch (error) {
      console.error("Failed to delete response:", error);
      toast.error("Failed to delete response");
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString();
  };

  const parseResponseData = (dataString: string) => {
    try {
      return JSON.parse(dataString);
    } catch {
      return {};
    }
  };

  useEffect(() => {
    loadResponses();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
          <span className="ml-2 text-muted-foreground">
            Loading responses...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <FileText className="h-8 w-8" />
            Scouting Responses
          </h1>
          <p className="text-muted-foreground mt-1">
            {responses.length} response{responses.length !== 1 ? "s" : ""}{" "}
            stored locally
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={loadResponses}
            disabled={isLoading}>
            <RefreshCw
              className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>

          <Button
            onClick={handleUpload}
            disabled={isUploading || responses.length === 0}>
            <Upload
              className={`h-4 w-4 mr-2 ${isUploading ? "animate-spin" : ""}`}
            />
            {isUploading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </div>

      {/* Responses List */}
      {responses.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No responses found</h3>
            <p className="text-muted-foreground text-center">
              Submit some scouting forms to see responses here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {responses.map((response, index) => {
            const parsedData = parseResponseData(response.data);
            const dataEntries = Object.entries(parsedData);

            return (
              <Card key={response.id || index}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Badge variant="secondary">
                        #{response.id || index + 1}
                      </Badge>
                      Response
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        response.id && handleDeleteResponse(response.id)
                      }
                      className="text-destructive hover:text-destructive hover:bg-destructive/10">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {response.user || "Unknown User"}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(response.date)}
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  {dataEntries.length > 0 ? (
                    <ScrollArea className="max-h-64">
                      <div className="space-y-2">
                        {dataEntries.map(([key, value], idx) => (
                          <div key={idx}>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                              <span className="font-medium text-sm min-w-0 flex-shrink-0">
                                {key}:
                              </span>
                              <span className="text-sm text-muted-foreground break-words">
                                {typeof value === "boolean"
                                  ? value
                                    ? "Yes"
                                    : "No"
                                  : String(value)}
                              </span>
                            </div>
                            {idx < dataEntries.length - 1 && (
                              <Separator className="mt-2" />
                            )}
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      No data available
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

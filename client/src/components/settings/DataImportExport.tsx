import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { exportUserData, importUserData, ExportableData, loadUserDataFromLocalStorage } from '@/lib/dataExporter';
import { Download, Upload, FileUp, RefreshCw, AlertTriangle } from 'lucide-react';

interface DataImportExportProps {
  username: string;
  onDataImported?: (data: ExportableData) => void;
}

const DataImportExport: React.FC<DataImportExportProps> = ({ username, onDataImported }) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      
      // Load existing data from localStorage or create new data
      const existingData = loadUserDataFromLocalStorage();
      
      if (existingData) {
        exportUserData(existingData);
        toast({
          title: "Data exported successfully",
          description: "Your data has been exported to a JSON file",
        });
      } else {
        toast({
          title: "No data to export",
          description: "You don't have any data saved yet",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error exporting data:', error);
      toast({
        title: "Export failed",
        description: "There was an error exporting your data",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const triggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsImporting(true);
      const data = await importUserData(file);
      
      // Call the callback with the imported data
      if (onDataImported) {
        onDataImported(data);
      }
      
      toast({
        title: "Data imported successfully",
        description: "Your data has been imported and will be applied",
      });
    } catch (error) {
      console.error('Error importing data:', error);
      toast({
        title: "Import failed",
        description: error instanceof Error ? error.message : "There was an error importing your data",
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Management</CardTitle>
        <CardDescription>
          Export or import your application data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg">
            <h3 className="text-lg font-medium mb-2 flex items-center">
              <Download className="h-5 w-5 mr-2 text-primary" />
              Export Data
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
              Download a copy of your data as a JSON file. You can use this file to back up your data or transfer it to another device.
            </p>
            <Button 
              onClick={handleExport} 
              disabled={isExporting}
              className="w-full"
            >
              {isExporting ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </>
              )}
            </Button>
          </div>
          
          <div className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg">
            <h3 className="text-lg font-medium mb-2 flex items-center">
              <Upload className="h-5 w-5 mr-2 text-primary" />
              Import Data
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
              Import data from a previously exported JSON file. This will replace your current data.
            </p>
            <input
              type="file"
              ref={fileInputRef}
              accept=".json"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button 
              onClick={triggerFileSelect} 
              disabled={isImporting}
              className="w-full"
            >
              {isImporting ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Importing...
                </>
              ) : (
                <>
                  <FileUp className="h-4 w-4 mr-2" />
                  Select File
                </>
              )}
            </Button>
          </div>
        </div>
        
        <div className="flex items-start p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
          <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-amber-800 dark:text-amber-300">Important Note</h4>
            <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">
              Importing data will replace your current settings and progress. Make sure to back up your current data before importing new data.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataImportExport;
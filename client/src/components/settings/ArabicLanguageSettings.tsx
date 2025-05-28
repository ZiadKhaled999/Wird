import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';

interface ArabicLanguageSettingsProps {
  showArabicText: boolean;
  showEnglishTranslation: boolean;
  arabicFontSize: 'small' | 'medium' | 'large';
  arabicTextAlign: 'right' | 'center';
  onSaveSettings: (settings: {
    showArabicText: boolean;
    showEnglishTranslation: boolean;
    arabicFontSize: 'small' | 'medium' | 'large';
    arabicTextAlign: 'right' | 'center';
  }) => void;
}

const ArabicLanguageSettings: React.FC<ArabicLanguageSettingsProps> = ({
  showArabicText = true,
  showEnglishTranslation = true,
  arabicFontSize = 'medium',
  arabicTextAlign = 'right',
  onSaveSettings
}) => {
  const { toast } = useToast();
  const [localShowArabicText, setLocalShowArabicText] = useState(showArabicText);
  const [localShowEnglishTranslation, setLocalShowEnglishTranslation] = useState(showEnglishTranslation);
  const [localArabicFontSize, setLocalArabicFontSize] = useState(arabicFontSize);
  const [localArabicTextAlign, setLocalArabicTextAlign] = useState(arabicTextAlign);

  const handleSaveSettings = () => {
    onSaveSettings({
      showArabicText: localShowArabicText,
      showEnglishTranslation: localShowEnglishTranslation,
      arabicFontSize: localArabicFontSize,
      arabicTextAlign: localArabicTextAlign
    });

    toast({
      title: "Settings Saved",
      description: "Your Arabic language preferences have been updated",
    });
  };

  // Sample Arabic text for preview
  const sampleArabicText = "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ";
  const sampleEnglishText = "In the name of Allah, the Most Gracious, the Most Merciful";

  // Get font size class based on setting
  const getFontSizeClass = () => {
    switch (localArabicFontSize) {
      case 'small': return 'text-xl';
      case 'large': return 'text-3xl';
      default: return 'text-2xl';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Arabic Language Settings</CardTitle>
        <CardDescription>
          Customize how Arabic text appears in posts
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="show-arabic">Show Arabic Text</Label>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Include the original Arabic text in posts
            </p>
          </div>
          <Switch 
            id="show-arabic" 
            checked={localShowArabicText}
            onCheckedChange={setLocalShowArabicText}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="show-english">Show English Translation</Label>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Include English translations in posts
            </p>
          </div>
          <Switch 
            id="show-english" 
            checked={localShowEnglishTranslation}
            onCheckedChange={setLocalShowEnglishTranslation}
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="arabic-font-size">Arabic Font Size</Label>
          <Select value={localArabicFontSize} onValueChange={(value: any) => setLocalArabicFontSize(value)}>
            <SelectTrigger id="arabic-font-size" className="w-full">
              <SelectValue placeholder="Select font size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Small</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="large">Large</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label>Text Alignment</Label>
          <RadioGroup 
            value={localArabicTextAlign} 
            onValueChange={(value: any) => setLocalArabicTextAlign(value)}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="right" id="align-right" />
              <Label htmlFor="align-right">Right-to-Left</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="center" id="align-center" />
              <Label htmlFor="align-center">Centered</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Preview section */}
        <div className="mt-6 p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg">
          <h3 className="text-sm font-medium mb-3">Preview</h3>
          <div className={`mb-4 font-amiri ${getFontSizeClass()} ${localArabicTextAlign === 'center' ? 'text-center' : 'text-right'}`} dir="rtl">
            {localShowArabicText ? sampleArabicText : ""}
          </div>
          {localShowEnglishTranslation && (
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
              {sampleEnglishText}
            </p>
          )}
        </div>

        <Button 
          onClick={handleSaveSettings} 
          className="w-full mt-4"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </CardContent>
    </Card>
  );
};

export default ArabicLanguageSettings;
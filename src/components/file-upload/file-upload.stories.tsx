import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { FileUpload } from "./file-upload";

const meta = {
  title: "Components/FileUpload",
  component: FileUpload,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [files, setFiles] = useState<Array<File>>([]);

    return (
      <div className="w-[339px]">
        <FileUpload
          label="Help Text"
          helperText="Upload your files here"
          files={files}
          onFilesChange={setFiles}
          onRemoveFile={(index) => {
            const newFiles = [...files];
            newFiles.splice(index, 1);
            setFiles(newFiles);
          }}
        />
      </div>
    );
  },
};

export const ButtonVariant: Story = {
  render: () => {
    const [files, setFiles] = useState<Array<File>>([]);

    return (
      <div className="w-[339px]">
        <FileUpload
          variant="button"
          buttonLabel="Unggah File"
          files={files}
          onFilesChange={setFiles}
          onRemoveFile={(index) => {
            const newFiles = [...files];
            newFiles.splice(index, 1);
            setFiles(newFiles);
          }}
        />
      </div>
    );
  },
};

export const ButtonVariantWithFile: Story = {
  render: () => {
    const mockFile = new File(["content"], "document.pdf", {
      type: "application/pdf",
    });
    const [files, setFiles] = useState<Array<File>>([mockFile]);

    return (
      <div className="w-[339px]">
        <FileUpload
          variant="button"
          buttonLabel="Unggah File"
          files={files}
          onFilesChange={setFiles}
          onRemoveFile={(index) => {
            const newFiles = [...files];
            newFiles.splice(index, 1);
            setFiles(newFiles);
          }}
        />
      </div>
    );
  },
};

export const WithUploadedFile: Story = {
  render: () => {
    // Create a mock file for demonstration
    const mockFile = new File(["content"], "file-name.csv", {
      type: "text/csv",
    });
    const [files, setFiles] = useState<Array<File>>([mockFile]);

    return (
      <div className="w-[339px]">
        <FileUpload
          label="Help Text"
          helperText="File uploaded successfully"
          files={files}
          onFilesChange={setFiles}
          onRemoveFile={(index) => {
            const newFiles = [...files];
            newFiles.splice(index, 1);
            setFiles(newFiles);
          }}
        />
      </div>
    );
  },
};

export const MultipleFiles: Story = {
  render: () => {
    const mockFiles = [
      new File(["content1"], "document.xlsx", {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }),
      new File(["content2"], "data-export.csv", { type: "text/csv" }),
      new File(["content3"], "report-2024.xls", {
        type: "application/vnd.ms-excel",
      }),
    ];
    const [files, setFiles] = useState<Array<File>>(mockFiles);

    return (
      <div className="w-[339px]">
        <FileUpload
          label="Upload Files"
          helperText="Multiple files uploaded"
          files={files}
          onFilesChange={setFiles}
          onRemoveFile={(index) => {
            const newFiles = [...files];
            newFiles.splice(index, 1);
            setFiles(newFiles);
          }}
        />
      </div>
    );
  },
};

export const ErrorState: Story = {
  render: () => {
    const [files, setFiles] = useState<Array<File>>([]);

    return (
      <div className="w-[339px]">
        <FileUpload
          label="Help Text"
          helperText="Helper text"
          error
          files={files}
          onFilesChange={setFiles}
          onRemoveFile={(index) => {
            const newFiles = [...files];
            newFiles.splice(index, 1);
            setFiles(newFiles);
          }}
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [files, setFiles] = useState<Array<File>>([]);

    return (
      <div className="w-[339px]">
        <FileUpload
          label="Help Text"
          helperText="Upload is currently disabled"
          disabled
          files={files}
          onFilesChange={setFiles}
        />
      </div>
    );
  },
};

export const CustomAccept: Story = {
  render: () => {
    const [files, setFiles] = useState<Array<File>>([]);

    return (
      <div className="w-[339px]">
        <FileUpload
          label="Upload Images"
          helperText="Only image files are accepted"
          accept=".png,.jpg,.jpeg,.gif"
          maxSize={10}
          files={files}
          onFilesChange={setFiles}
          onRemoveFile={(index) => {
            const newFiles = [...files];
            newFiles.splice(index, 1);
            setFiles(newFiles);
          }}
        />
      </div>
    );
  },
};

export const RealWorldExample: Story = {
  render: () => {
    const [csvFiles, setCsvFiles] = useState<Array<File>>([]);
    const [imageFiles, setImageFiles] = useState<Array<File>>([]);
    const [docFiles, setDocFiles] = useState<Array<File>>([]);
    const [csvError, setCsvError] = useState(false);

    const handleCsvUpload = (files: Array<File>) => {
      // Validate file size
      const oversizedFiles = files.filter(
        (file) => file.size > 5 * 1024 * 1024
      );
      if (oversizedFiles.length > 0) {
        setCsvError(true);
      } else {
        setCsvError(false);
        setCsvFiles(files);
      }
    };

    return (
      <div className="w-[600px] space-y-6">
        <h3 className="text-lg font-semibold">Document Upload Form</h3>

        <FileUpload
          label="Bulk Data Import"
          helperText={
            csvError
              ? "File size exceeds 5MB limit"
              : "Upload your CSV or Excel file for bulk import"
          }
          accept=".csv,.xlsx,.xls"
          maxSize={5}
          files={csvFiles}
          error={csvError}
          onFilesChange={handleCsvUpload}
          onRemoveFile={(index) => {
            const newFiles = [...csvFiles];
            newFiles.splice(index, 1);
            setCsvFiles(newFiles);
            setCsvError(false);
          }}
        />

        <FileUpload
          label="Profile Picture"
          helperText="Upload a profile picture (PNG, JPG, or GIF)"
          accept=".png,.jpg,.jpeg,.gif"
          maxSize={2}
          files={imageFiles}
          onFilesChange={setImageFiles}
          onRemoveFile={(index) => {
            const newFiles = [...imageFiles];
            newFiles.splice(index, 1);
            setImageFiles(newFiles);
          }}
        />

        <FileUpload
          label="Supporting Documents"
          helperText="Upload any supporting documents (PDF or Word)"
          accept=".pdf,.doc,.docx"
          maxSize={10}
          files={docFiles}
          onFilesChange={setDocFiles}
          onRemoveFile={(index) => {
            const newFiles = [...docFiles];
            newFiles.splice(index, 1);
            setDocFiles(newFiles);
          }}
        />

        <FileUpload
          label="Archive Upload (Disabled)"
          helperText="This upload area is currently disabled"
          disabled
          files={[]}
        />
      </div>
    );
  },
};

export const AllStates: Story = {
  render: () => {
    const mockFile = new File(["content"], "sample-file.csv", {
      type: "text/csv",
    });
    const [defaultFiles, setDefaultFiles] = useState<Array<File>>([]);
    const [uploadedFiles, setUploadedFiles] = useState<Array<File>>([mockFile]);
    const [errorFiles, setErrorFiles] = useState<Array<File>>([]);
    const [disabledFiles, setDisabledFiles] = useState<Array<File>>([]);
    const [buttonFiles, setButtonFiles] = useState<Array<File>>([]);
    const [buttonUploadedFiles, setButtonUploadedFiles] = useState<Array<File>>(
      [mockFile]
    );

    return (
      <div className="w-[1200px] space-y-6">
        <h3 className="text-lg font-semibold">Dropzone Variant</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="mb-2 text-sm font-medium">Default (Empty)</h4>
            <FileUpload
              label="Help Text"
              helperText="Upload your files"
              files={defaultFiles}
              onFilesChange={setDefaultFiles}
              onRemoveFile={(index) => {
                const newFiles = [...defaultFiles];
                newFiles.splice(index, 1);
                setDefaultFiles(newFiles);
              }}
            />
          </div>

          <div>
            <h4 className="mb-2 text-sm font-medium">With Uploaded File</h4>
            <FileUpload
              label="Help Text"
              helperText="File uploaded successfully"
              files={uploadedFiles}
              onFilesChange={setUploadedFiles}
              onRemoveFile={(index) => {
                const newFiles = [...uploadedFiles];
                newFiles.splice(index, 1);
                setUploadedFiles(newFiles);
              }}
            />
          </div>

          <div>
            <h4 className="mb-2 text-sm font-medium">Error State</h4>
            <FileUpload
              label="Help Text"
              helperText="File upload failed - file too large"
              error
              files={errorFiles}
              onFilesChange={setErrorFiles}
              onRemoveFile={(index) => {
                const newFiles = [...errorFiles];
                newFiles.splice(index, 1);
                setErrorFiles(newFiles);
              }}
            />
          </div>

          <div>
            <h4 className="mb-2 text-sm font-medium">Disabled</h4>
            <FileUpload
              label="Help Text"
              helperText="Upload is currently disabled"
              disabled
              files={disabledFiles}
              onFilesChange={setDisabledFiles}
            />
          </div>
        </div>

        <h3 className="text-lg font-semibold">Button Variant</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="mb-2 text-sm font-medium">Button (Empty)</h4>
            <FileUpload
              variant="button"
              buttonLabel="Unggah File"
              files={buttonFiles}
              onFilesChange={setButtonFiles}
              onRemoveFile={(index) => {
                const newFiles = [...buttonFiles];
                newFiles.splice(index, 1);
                setButtonFiles(newFiles);
              }}
            />
          </div>

          <div>
            <h4 className="mb-2 text-sm font-medium">Button (With File)</h4>
            <FileUpload
              variant="button"
              buttonLabel="Unggah File"
              files={buttonUploadedFiles}
              onFilesChange={setButtonUploadedFiles}
              onRemoveFile={(index) => {
                const newFiles = [...buttonUploadedFiles];
                newFiles.splice(index, 1);
                setButtonUploadedFiles(newFiles);
              }}
            />
          </div>
        </div>
      </div>
    );
  },
};

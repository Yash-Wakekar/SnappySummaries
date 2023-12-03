from langchain import OpenAI
from langchain.document_loaders import UnstructuredPDFLoader, PyPDFLoader
from langchain.document_loaders import Docx2txtLoader
from langchain.docstore.document import Document
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains.summarize import load_summarize_chain
from django.core.files.storage import FileSystemStorage
from langchain import PromptTemplate
from decouple import config
from .settings import BASE_DIR
import os
import openai



def save_uploaded_file(uploaded_file):
    fs = FileSystemStorage(os.path.join(BASE_DIR, 'static'))
    # Save the file and get the path to the saved file
    saved_file_path = fs.save(uploaded_file.name, uploaded_file)
    return saved_file_path

def get_file_extension(file_name):
    _, file_extension = os.path.splitext(file_name)
    return file_extension

def extract_text_pdf(pdf_path):
  loader = PyPDFLoader(pdf_path)
  data = loader.load()
  return data

def extact_text_audio(audio_path):
    openai.api_key = config('OPEN_AI_KEY')
    text_splitter = RecursiveCharacterTextSplitter(separators=["\n\n", "\n"], chunk_size=700, chunk_overlap=200)
    file = open(audio_path, "rb")
    transcription = openai.Audio.transcribe("whisper-1", file)
    texts = text_splitter.split_text(transcription['text'])
    data = [Document(page_content=t) for t in texts]
    return data

def extract_text_docx(docx_path):
  loader = Docx2txtLoader(docx_path)
  data = loader.load()
  return data

def prompt_for_category(category,minlines,maxlines,user_prompt):
  basic_prompt="Write the precise and concise summary of the following text delimited by triple backquotes.Summary should in simple english, it should be plagiarism free and non Ai dectecable. "
  if(category=='research assistance'):
    prompt_template="Following texts might be going to use for research oriented. if any other paper is cite in text so please mention the author name of that referenced paper after the text. "
  elif(category=='meeting'):
    prompt_template="following texts might be transcript of meeting, with summary also mention the meeting attendees and their job or meeting role if specified in given texts. "
  elif(category=='study'):
    prompt_template= "following texts might be regarding study, find the category of article and summarized it accordingly.Through summary user should get interest to learn more about the topic. "
  elif(category=='book'):
    prompt_template="following texts has been taken from book,find the category of book and summarized the content accordingly, provide the proper summary, so that user can understand about the book by summary only.If you find the author name, mention that also. "
  else:
     prompt_template="Find the texts category and use suitable vocabulary of that category. "

  return basic_prompt+prompt_template+"Do not respond with anything outside of the provided texts, use the bullets points wherever needed. Provide the summary in " + str(minlines) +" to " + str(maxlines) +" sentences. Provide the complete summary, do not provide incomplete summary with incomplete words, Last sentence must end by fullstop, and you can take extra space than specified to complete the summary. At the start of summary provide the title of the content make the string where first key must be title and second must be summary." +str(user_prompt)

def summarize_data(data,minlines,maxlines,category,input_file,user_prompt=''):
    llm = OpenAI(temperature=0, openai_api_key=config('OPEN_AI_KEY'))
    text_splitter = RecursiveCharacterTextSplitter(separators=["\n\n", "\n"], chunk_size=700, chunk_overlap=200)
    if(input_file == 'file'):
        texts = text_splitter.split_documents(data)
    if(input_file == 'text'):
        texts = text_splitter.split_text(data)
        docs = [Document(page_content=t) for t in texts]
        texts = docs
    map_prompt = """
    Write a concise summary of the following:
    "{text}"
    CONCISE SUMMARY:
    """
    map_prompt_template = PromptTemplate(template=map_prompt, input_variables=["text"])
    prompt_template = prompt_for_category(category, minlines, maxlines, user_prompt)
    combine_prompt = prompt_template + """
    ```{text}```
    Here is SUMMARY:
    """
    combine_prompt_template = PromptTemplate(template=combine_prompt, input_variables=["text"])
    summary_chain = load_summarize_chain(llm=llm, chain_type='map_reduce',
                                         map_prompt=map_prompt_template,
                                         combine_prompt=combine_prompt_template,
                                         )
    return summary_chain.run(texts)

